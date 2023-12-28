from collections import defaultdict
from enum import IntEnum
import random

class Singleton:
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(Singleton, cls).__new__(cls)
        return cls._instance
    
class Mode(IntEnum):
    LTC = 0,
    CTL = 1,
    AUD = 2,
    REC = 3
    
class RuntimeSession(Singleton):
    def __init__(self):
        if not hasattr(self, '_initialized'):
            self.session_data = defaultdict(SessionData)
            self._initialized = True

    def create_session(self, student_id, mode="", selected_dictionary=""):
        self.session_data[student_id] = SessionData(mode, selected_dictionary)

    def generate_question(self, student_id):
        from .models import Dictionary, Word
        dict_id = self.session_data[student_id].selected_dictionary
        mode = self.session_data[student_id].mode
        session_data = self.session_data[student_id]

        dictionary = Dictionary.objects.filter(_id=dict_id).last()
        words = Word.objects.filter(parent_dict=dictionary)
        random_word = random.choice(words)
        match mode:
            case Mode.LTC.value:
                self.session_data[student_id].current_question.word_question = random_word.word_str
                self.session_data[student_id].current_question.word_correct = random_word.cro_translation
                print(random_word.word_str)
                print(random_word.cro_translation)

                type = random_word.word_type
                other_words = words.filter(word_type=type)
                other_words_dict = [other_word.to_dict() for other_word in other_words]
                other_words_dict.remove(random_word.to_dict())
                for i in range(3):
                    other_word = random.choice(other_words_dict)
                    other_words_dict.remove(other_word)
                    self.session_data[student_id].current_question.word_answers[i] = other_word["cro_translation"]
                    print(other_word["cro_translation"])
            case _:
                session_data.current_question.set_question("", "", "")

    def destroy_session(self, student_id):
        del self.session_data[student_id]

class SessionData:
    def __init__(self, mode, selected_dictionary):
        self.answers_correct = 0
        self.answers_incorrect = 0
        self.mode = mode
        self.selected_dictionary = selected_dictionary
        self.current_question = Question()

class Question:
    def __init__(self):
        self.word_question = ""
        self.word_answers = ["", "", ""]
        self.word_correct = ""

    def set_question(self, question, answers, correct):
        self.word_question = question
        self.word_answers = answers
        self.word_correct = correct