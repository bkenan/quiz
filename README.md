# Quiz application

This abstract quiz application will allow admins to add different quizzes with different scores to pass, time to complete and difficulty levels. Users will be able to take quizzes with a simple user interface.


# Structure

Models: My application should have at least 4 models: one for question, one for quiz, and one for answer, one for results.

Quiz list: Users should be able to see the list of the available quizzes on the home page (at least 1 quiz should be displayed for the test purposes). I have included 2 for the testing purposes.

Quiz Page: I have used bootstrap modal form to enable this functionality. Clicking on a quiz should display a screen that contains the following information specific to the chosen quiz:
o Number of questions
o Time limit specific to the quiz
o Score required to pass
o Difficulty level
o Button that would allow to continue with the questions

Question page:
o Question page should allow users to see the list of the questions with
the possible answers.
o Users should be able to choose their answers, or leave questions
without the answers.
o Top left should demonstrate the score required for passing, top right should demonstrate the time countdown (I'm still working on the time component)
o Save button should take users to the results page

Django Admin Interface: Via the Django admin interface, a site administrator
should be able to view, add, edit, and delete any listings. I have added 2 quizzes, their questions (5 for each) and correct answers.

Results page: This page should allow users to see their scores with the relevant message. The page should also provide feedback in the following way: for correct answers, display the user's answer in green colored background. For the wrong answer, display the user’s answer / correct answer all in the red colored background. For the not provided answer, display the No answer” in the gray background.
