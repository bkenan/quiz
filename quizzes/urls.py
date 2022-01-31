from django.urls import path
from .views import (
    QuizListView,
    quizzes,
    questions,
    save,
)

app_name = 'quizzes'

urlpatterns = [
    path('', QuizListView.as_view(), name='quiz_list_view'),
    path('<pk>/', quizzes, name='quizzes'),
    path('<pk>/data/', questions, name='questions'),
    path('<pk>/save/', save, name='save'),
]