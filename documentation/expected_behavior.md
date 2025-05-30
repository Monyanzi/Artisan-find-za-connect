# Expected Behavior of Core Features

This document outlines the expected behavior of the core features of the application. This information will be used to inform the testing phase.

## Homepage
- **Hero Section:** Displays a prominent hero section with a captivating image or video and a clear call to action.
- **Categories List:** Shows a list of available service categories (e.g., plumbing, electrical, carpentry). Each category should be clickable, leading to the respective Category Page.
- **Featured Artisans:** Highlights a selection of top-rated or new artisans. Each featured artisan should be clickable, leading to their Artisan Profile Page.
- **Search Bar:** A clearly visible search bar allowing users to initiate a search for artisans or services.

## Category Page
- **Category Title:** Displays the name of the selected category.
- **Artisan List:** Lists all artisans belonging to the selected category.
    - Each artisan entry should display their name, a brief description of their services, their average rating, and a profile picture.
    - Clicking on an artisan entry should navigate the user to the Artisan Profile Page for that artisan.
- **Filtering and Sorting (Optional but Recommended):**
    - Users should be able to filter artisans by sub-categories (if applicable), location, availability, or other relevant criteria.
    - Users should be able to sort artisans by rating, price range (if available), or name.

## Artisan Profile Page
- **Artisan Information:** Displays detailed information about the artisan, including:
    - Name and profile picture.
    - Detailed description of their skills, experience, and services offered.
    - Service area or location.
    - Contact information (e.g., phone number, email - potentially masked or accessible after booking).
- **Services List:** A clear list of services offered by the artisan, potentially with pricing information (e.g., hourly rate, fixed price for common tasks).
- **Ratings and Reviews:** Displays customer ratings and reviews for the artisan.
    - Users should be able to read existing reviews.
    - Potentially, users who have booked this artisan can leave a review.
- **Booking Section:**
    - A clear call to action to book the artisan (e.g., "Book Now", "Request Service").
    - This might involve a calendar for selecting dates/times, a form to describe the required service, or direct contact initiation.
- **Portfolio/Gallery (Optional):** If applicable to the artisan's trade, a section showcasing examples of their past work.

## Search Page
- **Search Input:** An input field where users can type their search query (e.g., "electrician in London", "fix leaky faucet").
- **Search Results:** Displays a list of artisans or services that match the search term.
    - Results should be relevant to the query.
    - Each result item should provide enough information for the user to decide if it's relevant (similar to artisan entries on the Category Page).
    - Clicking on a result should lead to the corresponding Artisan Profile Page or service page.
- **No Results Message:** If no results are found, a clear message should inform the user.
- **Filtering and Sorting:** Similar to the Category Page, allowing users to refine search results.

## Bookings Page (User-Specific)
- **Requires Login:** This page should only be accessible to logged-in users.
- **Upcoming Bookings:** Displays a list of services the user has booked that are yet to be completed.
    - Each booking should show the artisan's name, service details, date and time, and status (e.g., Confirmed, Pending Artisan Acceptance).
    - Options to cancel or reschedule (if permitted by the platform rules and artisan policy).
- **Past Bookings:** Displays a list of completed or canceled services.
    - Each booking should show artisan details, service provided, date, and final status.
    - Option to re-book the same artisan/service.
    - Option to leave a review for completed services.

## Messages Page (User-Specific)
- **Requires Login:** This page should only be accessible to logged-in users.
- **Conversation List:** Displays a list of ongoing conversations with artisans or platform support.
    - Each conversation should indicate the other party and show a snippet of the last message.
    - Unread messages should be clearly highlighted.
- **Message View:** When a conversation is selected:
    - Displays the history of messages in chronological order.
    - Provides an input field for the user to type and send new messages.
    - Timestamps for messages.
- **Initiate New Message (Optional):** Ability to start a new conversation, perhaps by selecting an artisan from a list of previous bookings or contacts.

## Profile Page (User-Specific)
- **Requires Login:** This page should only be accessible to logged-in users.
- **View Profile Information:** Displays the user's current profile information:
    - Name
    - Email address (may or may not be editable)
    - Phone number
    - Profile picture (if applicable)
    - Location/Address (for service delivery)
- **Edit Profile Information:** Allows the user to update their editable profile information.
    - Input fields for each editable piece of information.
    - A "Save Changes" button.
- **Account Settings:**
    - Change password functionality.
    - Notification preferences.
    - Payment methods (if applicable).
    - Option to delete account (with appropriate warnings and confirmation).
- **Artisan Profile (If the user is also an artisan):** If the platform supports dual roles, and the user is an artisan, there should be a clear distinction or toggle to manage their artisan profile (which would have different fields like services offered, service area, etc.).
