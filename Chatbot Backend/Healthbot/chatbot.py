from chatterbot import ChatBot
from flask import Flask, request
from flask_cors import CORS, cross_origin
from chatterbot.trainers import ChatterBotCorpusTrainer

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS HEADERS'] = 'Content-Type'
bot = ChatBot('chatterbot', storage_adapter="chatterbot.storage.SQLStorageAdapter")
bot.storage.drop()
healthcare_trainer = ChatterBotCorpusTrainer(bot)
# healthcare_trainer.train('C:\\Users\\vaghe\\FinalProject\\Chatbot Backend\\Healthbot\\healthcare_corpus.yml')
healthcare_trainer.train('C:\\Users\\vaghe\\FinalProject\\Chatbot Backend\\Healthbot\\healthcare_corpus')


@app.route('/')
@cross_origin()
def home():
    return 'Welcome Home'

@app.route('/user', methods=['POST'])
@cross_origin()
def user():
    json_data = request.json
    user_message = json_data['msg']
    response = str(bot.get_response(user_message))
    return response

if __name__ == '__main__':
    app.run(threaded=False)
