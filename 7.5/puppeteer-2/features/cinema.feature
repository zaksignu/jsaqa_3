@cinema
Feature: cinema testing
    Scenario: Should book 1 ticket for one hall on random date
        Given user is on "index.php" page
        When user choose random date of film
        When user choose 1900 film "Logan"
        When user choose random seat
        Then user sees boooking confirmation