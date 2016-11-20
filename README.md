
URL Shortener Microservice

User stories:

    I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

    When I visit that shortened URL, it will redirect me to my original link.

Example creation usage:

    https://api-project3-br4in.c9users.io/new/https://www.startpage.com

    https://api-project3-br4in.c9users.io/new/www.startpage.com

Example creation output:

{ 
"full_url":"https://www.startpage.com", 
"short_url":"https://api-project3-br4in.c9users.io/3HgqJ" 
}

Usage:

    https://api-project3-br4in.c9users.io/3HgqJ

Will redirect to:

    https://www.startpage.com
