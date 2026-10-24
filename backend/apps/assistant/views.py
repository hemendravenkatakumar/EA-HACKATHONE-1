import os
import io
import re
import time
from django.http import HttpResponse
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import ChatSession, ChatMessage, DiseaseScan
from .serializers import ChatSessionSerializer, ChatMessageSerializer, DiseaseScanSerializer
from .ai_service import AgroVoiceAIService

class ChatAPIView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [JSONParser, FormParser, MultiPartParser]

    def post(self, request):
        user_query = request.data.get('message', '').strip()
        if not user_query:
            return Response({'error': 'Message field is required'}, status=status.HTTP_400_BAD_REQUEST)

        farm_type = request.data.get('farm_type', 'crop')
        language = request.data.get('language', 'en')
        session_id = request.data.get('session_id')

        # Retrieve or create ChatSession in SQL Database
        session = None
        if session_id:
            try:
                session = ChatSession.objects.get(id=session_id)
            except (ChatSession.DoesNotExist, Exception):
                session = None

        if not session:
            user = request.user if request.user.is_authenticated else None
            title = user_query[:50] if len(user_query) > 50 else user_query
            session = ChatSession.objects.create(
                user=user,
                session_title=title or 'Farming Consultation',
                farm_type=farm_type,
                language=language
            )

        # Save farmer message to Database
        user_msg = ChatMessage.objects.create(
            session=session,
            sender='user',
            text=user_query
        )

        # Call AI Engine (Gemini API or Expert Indian Agronomy Engine)
        ai_result = AgroVoiceAIService.get_chat_response(
            query=user_query,
            farm_type=farm_type,
            language=language
        )

        # Save AI assistant response to Database
        ai_msg = ChatMessage.objects.create(
            session=session,
            sender='assistant',
            text=ai_result['answer'],
            suggested_route=ai_result.get('route', '')
        )

        # Mirror to MongoDB Atlas if connected
        try:
            from agrovoice_backend.mongodb import get_chat_history_collection
            mongo_chats = get_chat_history_collection()
            if mongo_chats is not None:
                mongo_chats.insert_one({
                    'session_id': str(session.id),
                    'user_query': user_query,
                    'assistant_response': ai_result['answer'],
                    'farm_type': farm_type,
                    'language': language,
                    'suggested_route': ai_result.get('route', ''),
                    'timestamp': time.time()
                })
        except Exception:
            pass

        return Response({
            'session_id': str(session.id),
            'user_message': ChatMessageSerializer(user_msg).data,
            'assistant_message': ChatMessageSerializer(ai_msg).data,
            'suggested_route': ai_result.get('route', ''),
            'engine_source': ai_result.get('source', 'expert_system')
        }, status=status.HTTP_200_OK)


class ChatHistoryAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        session_id = request.query_params.get('session_id')
        if session_id:
            try:
                session = ChatSession.objects.get(id=session_id)
                return Response(ChatSessionSerializer(session).data)
            except ChatSession.DoesNotExist:
                return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

        # List recent sessions
        if request.user.is_authenticated:
            sessions = ChatSession.objects.filter(user=request.user).order_by('-created_at')[:10]
        else:
            sessions = ChatSession.objects.all().order_by('-created_at')[:10]

        return Response(ChatSessionSerializer(sessions, many=True).data)


class DiseaseScanAPIView(APIView):
    permission_classes = [AllowAny]
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def post(self, request):
        crop_or_species = request.data.get('crop_or_species', 'Paddy / Rice')
        farm_type = request.data.get('farm_type', 'crop')
        image_file = request.FILES.get('image')

        # Run AI Diagnostic engine
        image_temp_path = ''
        if image_file:
            # We can inspect the file or temporary path
            image_temp_path = getattr(image_file, 'temporary_file_path', lambda: '')()

        diagnostic_result = AgroVoiceAIService.analyze_image_disease(
            image_path=image_temp_path,
            crop_or_species=crop_or_species,
            farm_type=farm_type
        )

        # Persist diagnostic record in SQL Database
        user = request.user if request.user.is_authenticated else None
        scan_record = DiseaseScan.objects.create(
            user=user,
            farm_type=farm_type,
            image=image_file,
            crop_or_species=crop_or_species,
            detected_disease=diagnostic_result['detected_disease'],
            telugu_disease_name=diagnostic_result.get('telugu_disease_name', ''),
            confidence_percentage=diagnostic_result['confidence_percentage'],
            symptoms=diagnostic_result['symptoms'],
            treatment_organic=diagnostic_result['treatment_organic'],
            treatment_chemical=diagnostic_result['treatment_chemical']
        )

        # Mirror scan record to MongoDB Atlas if connected
        try:
            from agrovoice_backend.mongodb import get_farm_reports_collection
            mongo_reports = get_farm_reports_collection()
            if mongo_reports is not None:
                mongo_reports.insert_one({
                    'report_type': 'disease_scan',
                    'farm_type': farm_type,
                    'crop_or_species': crop_or_species,
                    'detected_disease': scan_record.detected_disease,
                    'telugu_disease_name': scan_record.telugu_disease_name,
                    'confidence_percentage': float(scan_record.confidence_percentage),
                    'symptoms': scan_record.symptoms,
                    'treatment_organic': scan_record.treatment_organic,
                    'treatment_chemical': scan_record.treatment_chemical,
                    'created_at': time.time()
                })
        except Exception:
            pass

        return Response({
            'id': str(scan_record.id),
            'crop_or_species': scan_record.crop_or_species,
            'detected_disease': scan_record.detected_disease,
            'telugu_disease_name': scan_record.telugu_disease_name,
            'confidence_percentage': float(scan_record.confidence_percentage),
            'symptoms': scan_record.symptoms,
            'treatment_organic': scan_record.treatment_organic,
            'treatment_chemical': scan_record.treatment_chemical,
            'image_url': scan_record.image.url if scan_record.image else None,
            'disclaimer': 'Simulated demonstration result. Confirm with Village Agriculture Assistant before chemical application.'
        }, status=status.HTTP_201_CREATED)


class TTSAPIView(APIView):
    """
    Multilingual Text-to-Speech API for Indian Regional Languages
    Generates authentic voice audio in Telugu, Hindi, Tamil, Kannada, and Indian English.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        text = request.GET.get('text', '')
        lang = request.GET.get('lang', 'en')
        return self._generate_speech(text, lang)

    def post(self, request):
        text = request.data.get('text', '')
        lang = request.data.get('lang', 'en')
        return self._generate_speech(text, lang)

    def _generate_speech(self, text, lang):
        text = (text or '').strip()
        if not text:
            return Response({'error': 'No text provided'}, status=status.HTTP_400_BAD_REQUEST)

        # Remove markdown symbols, URLs, and limit length for clean pronunciation
        clean_text = re.sub(r'[*#_`~\[\]()]', ' ', text)
        clean_text = re.sub(r'\s+', ' ', clean_text).strip()[:350]

        valid_lang = lang if lang in ['te', 'hi', 'ta', 'kn', 'en'] else 'en'
        try:
            from gtts import gTTS
            if valid_lang == 'en':
                tts = gTTS(text=clean_text, lang='en', tld='co.in')
            else:
                tts = gTTS(text=clean_text, lang=valid_lang)

            buf = io.BytesIO()
            tts.write_to_fp(buf)
            buf.seek(0)
            response = HttpResponse(buf.read(), content_type='audio/mpeg')
            response['Cache-Control'] = 'public, max-age=86400'
            return response
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
