## 1.
Because there are new tools and frameworks implemented in this lab
from last lab, there are mulitple directories containing large amounts of
various files pertaining to these frameworks. Because of this, it makes sense
to have .gitignore files specific to each directory, as each one is vastly
different. There is one for the top directory, server, and client.

## 2.
The client aspect of this lab is significant enough that, along with the server,
it makes sense to be able to run a gradle build of the client in its own right.
Also, along with the server unit tests, there are now client tests, as well as
end to end tests. All of these can be run independly of eachother. And for that
reason, it makes sense for there to be seperate build files to support that ability.

## 3. 
There is a "universal" navbar and header that is created in navbar.component.html, and app.component.html, respectively.
that is routed to the user and todo pages without needing to communicate with Spark. This is handled by Angular 4, where there are app.component files in the
top directory, that allow routing throughout the client pages.

## 4.
user-list.service.ts handles requests to the server, whereas user-list.component.ts filters/handles the things received from said request. This possible because the service class is injected into the component class. The component file
also deals with any methods called from the html, or variables that may be
changed based on what the user selects or inputs. Distinguishing between these tasks and seperating them into services and components helps to organize our project and could forseeably be useful for security purposes by providing another layer before the server can possibly be accessed.

