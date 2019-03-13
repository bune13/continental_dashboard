from app import app
# from .models import Survey
from flask import url_for, session
from twilio.twiml.voice_response import VoiceResponse
# from twilio.twiml.messaging_response import MessagingResponse


@app.route('/voice')
def voice_survey():
	print "dev"
    response = VoiceResponse()
    return "dev"
    # survey = Survey.query.first()
    # if survey_error(survey, response.say):
    #     return str(response)

    # welcome_user(survey, response.say)
    # redirect_to_first_question(response, survey)
    # return str(response)