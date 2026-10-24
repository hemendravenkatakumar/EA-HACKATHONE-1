import { Language } from '../types/farming'

export function getSimulatedAIResponse(
  query: string,
  type: 'crop' | 'fish',
  lang: Language
): { answer: string; route?: string } {
  const q = query.toLowerCase()

  if (type === 'crop') {
    if (q.includes('yellow') || q.includes('వరి') || q.includes('పసుపు') || q.includes('leaf') || q.includes('पीली') || q.includes('மஞ்சள்') || q.includes('ಹಳದಿ')) {
      let answer = 'Demo Insight: Yellowing of paddy leaves typically indicates Nitrogen or Zinc deficiency. Top-dress with 25 kg Urea + 10 kg Zinc Sulphate per acre.'
      if (lang === 'te') {
        answer = 'గమనిక: వరి ఆకులు పసుపు రంగులోకి మారడానికి నత్రజని లేదా జింక్ లోపం కారణం కావచ్చు. ఎకరాకు 25 కిలోల యూరియా + 10 కిలోల జింక్ సల్ఫేట్ చల్లండి.'
      } else if (lang === 'hi') {
        answer = 'कृषि सलाह: धान की पत्तियों का पीला पड़ना नाइट्रोजन या जिंक की कमी का संकेत है। प्रति एकड़ 25 किग्रा यूरिया और 10 किग्रा जिंक सल्फेट डालें।'
      } else if (lang === 'ta') {
        answer = 'விவசாயக் குறிப்பு: நெல் இலைகள் மஞ்சள் நிறமாக மாறுவது நைட்ரஜன் அல்லது துத்தநாகக் குறைபாட்டைக் குறிக்கிறது.'
      } else if (lang === 'kn') {
        answer = 'ಕೃಷಿ ಸಲಹೆ: ಭತ್ತದ ಎಲೆಗಳು ಹಳದಿಯಾಗುವುದು ಸಾರಜನಕ ಅಥವಾ ಸತುವಿನ ಕೊರತೆಯ ಲಕ್ಷಣವಾಗಿದೆ.'
      }
      return { answer, route: 'disease' }
    }

    if (q.includes('irrigation') || q.includes('water') || q.includes('నీరు') || q.includes('వర్షం') || q.includes('मौसम') || q.includes('வானிலை') || q.includes('ಮಳೆ')) {
      let answer = 'Weather Advisory: Regional forecast indicates a 60% probability of rain within 48 hours. Postpone heavy irrigation and foliar sprays.'
      if (lang === 'te') {
        answer = 'వాతావరణ సలహా: రాబోయే 48 గంటల్లో వర్షం పడే అవకాశం ఉంది. కనుక నేడు భారీ నీటిపారుదల చేయవద్దు.'
      } else if (lang === 'hi') {
        answer = 'मौसम सलाह: आगामी 48 घंटों में बारिश की संभावना है। भारी सिंचाई स्थगित करें।'
      } else if (lang === 'ta') {
        answer = 'வானிலை ஆலோசனை: அடுத்த 48 மணி நேரத்தில் மழை பெய்ய வாய்ப்புள்ளது.'
      } else if (lang === 'kn') {
        answer = 'ಹವಾಮಾನ ಸಲಹೆ: ಮುಂದಿನ 48 ಗಂಟೆಗಳಲ್ಲಿ ಮಳೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ.'
      }
      return { answer, route: 'weather' }
    }

    if (q.includes('scheme') || q.includes('పథకం') || q.includes('subsid') || q.includes('రైతు భరోసా') || q.includes('योजना') || q.includes('திட்டம்') || q.includes('ಯೋಜನೆ')) {
      let answer = 'Government Subsidies: Active schemes include PM-KISAN (₹6,000/yr), PM Fasal Bima Yojana, and PMKSY for micro-irrigation.'
      if (lang === 'te') {
        answer = 'ప్రభుత్వ పథకాలు: PM-కిసాన్ ద్వారా ఏడాదికి ₹6,000 మరియు డ్రిప్ పరికరాలపై 55% నుండి 90% వరకు రాయితీ ఉంది.'
      } else if (lang === 'hi') {
        answer = 'सरकारी योजनाएं: मुख्य योजनाओं में पीएम-किसान (₹6,000 प्रति वर्ष) और ड्रिप सिंचाई पर सब्सिडी उपलब्ध है।'
      } else if (lang === 'ta') {
        answer = 'அரசு திட்டங்கள்: பிஎம் கிசான் (ஆண்டுக்கு ₹6,000) மற்றும் சொட்டு நீர் பாசனத்திற்கு மானியம் வழங்கப்படுகிறது.'
      } else if (lang === 'kn') {
        answer = 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು: ಪಿಎಂ-ಕಿಸಾನ್ (ವರ್ಷಕ್ಕೆ ₹6,000) ಮತ್ತು ಹನಿ ನೀರಾವರಿಗೆ ಸಬ್ಸಿಡಿ ಲಭ್ಯವಿದೆ.'
      }
      return { answer, route: 'schemes' }
    }

    let defaultAns = 'AgroVoice AI Guidance: Ensure balanced N-P-K nutrient application based on Soil Health Card and monitor soil moisture.'
    if (lang === 'te') {
      defaultAns = 'ఆగ్రోవాయిస్ AI సలహా: మట్టి పరీక్ష ఫలితాల ఆధారంగా ఎరువులను సమతుల్యంగా వాడండి.'
    } else if (lang === 'hi') {
      defaultAns = 'एग्रोवॉयस एआई सलाह: मृदा स्वास्थ्य कार्ड के अनुसार संतुलित खाद का उपयोग करें।'
    } else if (lang === 'ta') {
      defaultAns = 'அக்ரோவாய்ஸ் AI ஆலோசனை: மண் பரிசோதனை அட்டை அடிப்படையில் சமச்சீரான உரமிடுதலைப் பின்பற்றுங்கள்.'
    } else if (lang === 'kn') {
      defaultAns = 'ಅಗ್ರೋವಾಯ್ಸ್ ಎಐ ಸಲಹೆ: ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಪ್ರಕಾರ ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರವನ್ನು ಬಳಸಿ.'
    }
    return { answer: defaultAns }
  } else {
    if (q.includes('ammonia') || q.includes('ph') || q.includes('నీరు') || q.includes('ఆక్సిజన్') || q.includes('ऑक्सीजन') || q.includes('ஆக்சிஜன்') || q.includes('ಆಮ್ಲಜನಕ')) {
      let answer = 'Aquaculture Water Quality: If dawn DO is below 4.0 mg/L, run aerators immediately. For high ammonia, reduce feed.'
      if (lang === 'te') {
        answer = 'నీటి నాణ్యత సలహా: తెల్లవారుజామున ఆక్సిజన్ తగ్గితే ఎయిరేటర్లను ఆన్ చేయండి. అమ్మోనియా పెరిగితే మేత తగ్గించండి.'
      } else if (lang === 'hi') {
        answer = 'जल गुणवत्ता सलाह: सुबह घुलित ऑक्सीजन कम होने पर तुरंत एरेटर चलाएं। अमोनिया बढ़ने पर चारा कम करें।'
      } else if (lang === 'ta') {
        answer = 'நீர் தரம் ஆலோசனை: அதிகாலை ஆக்ஸிஜன் அளவு குறைந்தால் காற்றோட்டக் கருவிகளை இயக்கவும்.'
      } else if (lang === 'kn') {
        answer = 'ನೀರಿನ ಗುಣಮಟ್ಟದ ಸಲಹೆ: ಮುಂಜಾನೆ ಕರಗಿದ ಆಮ್ಲಜನಕ ಕಡಿಮೆಯಿದ್ದರೆ ಏರೇಟರ್‌ಗಳನ್ನು ಆನ್ ಮಾಡಿ.'
      }
      return { answer, route: 'water' }
    }

    if (q.includes('surface') || q.includes('pipe') || q.includes('గాలి') || q.includes('చేపలు పైకి') || q.includes('गैस') || q.includes('மேலே')) {
      let answer = 'Emergency Hypoxia Alert: Fish piping at the surface indicates oxygen depletion. Run all aerators immediately.'
      if (lang === 'te') {
        answer = 'అత్యవసర హెచ్చరిక: చేపలు నీటిపైకి తేలి గాలి పీలుస్తుంటే అది తీవ్రమైన ఆక్సిజన్ కొరత. ఎయిరేటర్లను తక్షణమే ఆన్ చేయండి.'
      } else if (lang === 'hi') {
        answer = 'आपातकालीन चेतावनी: मछलियों का सतह पर आना ऑक्सीजन की कमी का संकेत है। तुरंत एरेटर चलाएं।'
      } else if (lang === 'ta') {
        answer = 'அவசர எச்சரிக்கை: மீன்கள் மேற்பரப்பில் சுவாசித்தால் தீவிர ஆக்ஸிஜன் பற்றாக்குறை உள்ளது.'
      } else if (lang === 'kn') {
        answer = 'ತುರ್ತು ಎಚ್ಚರಿಕೆ: ಮೀನುಗಳು ಮೇಲ್ಮೈಗೆ ಬಂದರೆ ತೀವ್ರ ಆಮ್ಲಜನಕದ ಕೊರತೆಯಾಗಿದೆ.'
      }
      return { answer, route: 'health' }
    }

    let defaultFishAns = 'AgroVoice Aquaculture Advice: Maintain FCR near 1.4-1.6 using quality pellet feed and monitor feeding trays.'
    if (lang === 'te') {
      defaultFishAns = 'ఆగ్రోవాయిస్ ఆక్వా సలహా: నాణ్యమైన ఫ్లోటింగ్ ఫీడ్ ఉపయోగించి FCR 1.5 లోపు ఉండేలా చూసుకోండి.'
    } else if (lang === 'hi') {
      defaultFishAns = 'एग्रोवॉयस मत्स्य सलाह: उचित एफसीआर बनाए रखने के लिए फ्लोटिंग पेलेट दाना दें।'
    } else if (lang === 'ta') {
      defaultFishAns = 'அக்ரோவாய்ஸ் மீன்வள ஆலோசனை: மிதக்கும் தீவனத்தைப் பயன்படுத்தி உகந்த FCR பராமரிக்கவும்.'
    } else if (lang === 'kn') {
      defaultFishAns = 'ಅಗ್ರೋವಾಯ್ಸ್ ಮತ್ಸ್ಯ ಸಲಹೆ: ಉತ್ತಮ ಎಫ್‌ಸಿಆರ್ ಕಾಪಾಡಿಕೊಳ್ಳಲು ತೇಲುವ ಆಹಾರವನ್ನು ನೀಡಿ.'
    }
    return { answer: defaultFishAns }
  }
}
