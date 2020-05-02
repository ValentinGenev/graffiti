# graffiti
A basic anonymous message board

## Setup
1. In `/credentials` remove '-sample' from the `creds-sample.php`;
2. replace the sample credentials with your database credentials;
3. visit the `./database/create-messages-table.php` script to setup the database.

## To do

### Next
1. ~~Make sure that poster's message is shown after post;~~
2. let the last poster know if there are more new posts between the last rendered post and poster's latest post;
3. deliver the unloaded posts between the last rendered post and latest poster's post in payloads of max of 10 messages;
4. make sure that the last payload doesn't show messages that were already rendered;
5. while delivering the older messages, deliver new posts if any in payloads of max of 10 messages.

### Sprint after
