###Kewen Gu
###CS4241 Assignment 8
###URL: <a href="https://kgu-cs4241-main.herokuapp.com">https://kgu-cs4241-main.herokuapp.com</a>

<br>
The style of this assignment is simply a huge background with all element of the page aligned at the center with proper margins. Inline blocks are used to display movie info. And a side bar navigates through the movie blocks.

Templating is used in this assignment. All the functionalities are achieved using AJAX. Addition features include side bar navigation, and permiting user to click on the like/dislike button and refresh the page to reload the number of likes and dislikes.

In this assignment, I utilized the express-session api. Each session has a duration of 10 mins. Therefore, if a user closes his/her browser, and the session becomes inactive for more than 10 mins, this session will not be valid any more. If the user visits the webpage later on, a new session will be created and a new session id will be assigned.
