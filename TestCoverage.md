End to End

On the end to end side of testing, we mostly checked what todos were returned
as a result of the inputted filters. Owner was checked to satisfy that the server
would properly return filtered results. Category and Status were checked for each
possible choice to verify that our dropdown functionality is intact. Content
is also checked. The testing of the client-side filters also ensures that the
server is returning all todos when it is asked to do so. We also included a test
with multiple parameters to make sure that combinations are possible and are
working properly.

Client-Side

For the client side, we first check to see the the todo object contains the
properties that we would expect it to have and can be filtered based on them.
We then examine our client-side filtering method to make sure it is working
properly by checking each of the three properties it is responsible for 
filtering. We also check that multiple parameters are working and returning what we would
expect. The testing of the client-side filter focuses on testing the length of
the returned list of todos, which is something that the E2E testing doesn't
really address so we thought it was beneficial that it was covered in this section.
Error testing that was transferred from the user-list.spec file was also included
in our tests here.
