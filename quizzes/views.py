from django.shortcuts import render
from .models import Quiz, Question, Answer, Result
from django.views.generic import ListView
from django.http import JsonResponse


class QuizListView(ListView):
    model = Quiz
    template_name = 'quizzes/quizzes.html'


# getting the list of quizzes
def quizzes(request, pk):
    quiz = Quiz.objects.get(pk=pk)
    return render(request, 'quizzes/quiz.html', {'obj': quiz})


# getting the array of questions and answers using pk
# json response includes the time as well
def questions(request, pk):
    quiz = Quiz.objects.get(pk=pk)
    questions = []
    for q in quiz.get_questions():
        answers = []
        for a in q.get_answers():
            answers.append(a.text)
        questions.append({str(q): answers})
    return JsonResponse({
        'data': questions,
        'time': quiz.time,
    })


# this function uses Post method to send the answers to the server
def save(request, pk):
    if request.is_ajax():
        questions = []
        data = request.POST
        data_ = dict(data.lists())
        data_.pop('csrfmiddlewaretoken')

        # looping through data keys on question objects
        for k in data_.keys():
            question = Question.objects.get(text=k)
            questions.append(question)

        user = request.user
        quiz = Quiz.objects.get(pk=pk)

        # defining score calculation
        score = 0
        multiplier = 100 / quiz.question_numbers
        results = []
        correct_answer = None

        # handling the provided answers by users
        # adding scores based on the right answers
        for q in questions:
            user_answer = request.POST.get(q.text)

            if user_answer != "":
                question_answers = Answer.objects.filter(question=q)
                for a in question_answers:
                    if user_answer == a.text:
                        if a.correct:
                            score += 1
                            correct_answer = a.text
                    else:
                        if a.correct:
                            correct_answer = a.text

                results.append({str(q): {'correct_answer': correct_answer, 'user_answer': user_answer}})
            else:
                results.append({str(q): 'No answer'})
        score_ = score * multiplier
        Result.objects.create(quiz=quiz, user=user, score=score_)

        if score_ >= quiz.pass_score:
            return JsonResponse({'passed': True, 'score': score_, 'results': results})
        else:
            return JsonResponse({'passed': False, 'score': score_, 'results': results})
