# Identified Issues List

This document lists problems identified during the code review and analysis against expected behavior.

## Homepage Issues (`src/pages/Index.tsx` and sub-components)

---

### 1. Hardcoded Hero Content
- **Description:** The Hero component's main content (title, subtitle, background image) is hardcoded.
- **Location(s):** `src/components/home/Hero.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** Hero content should ideally be configurable via props or fetched dynamically if it's meant to change.
    - **Actual:** Title "Find Trusted Artisans in South Africa", the descriptive paragraph, and the background image URL are static values within the component.
- **Reproduction Steps:** View the Homepage. Observe the Hero section content. Inspect the code in `src/components/home/Hero.tsx`.
- **Suggested Severity:** Minor (as it's functional for a static MVP, but limits flexibility)

---

### 2. Non-functional "Popular" Category Links in Hero
- **Description:** The "Popular" category links (e.g., Plumbing, Electrical) in the Hero section are not interactive.
- **Location(s):** `src/components/home/Hero.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** Clicking these links should navigate to the respective category pages or initiate a search for that category.
    - **Actual:** The links are `Button` components with `variant="link"` but lack `onClick` handlers or `href` attributes. They are also hardcoded.
- **Reproduction Steps:** View the Homepage. Attempt to click on "Plumbing", "Electrical", etc., under the search bar in the Hero section.
- **Suggested Severity:** Minor (as search bar provides primary navigation, but these are expected to work)

---

### 3. Non-functional "Learn how it works" Link in Hero
- **Description:** The "Learn how it works" link in the Hero section's bottom bar is not interactive.
- **Location(s):** `src/components/home/Hero.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** Clicking this link should navigate to an informational page or section explaining the platform.
    - **Actual:** The link is present but has no navigation action tied to it.
- **Reproduction Steps:** View the Homepage. Attempt to click on the "Learn how it works" link at the bottom of the Hero section.
- **Suggested Severity:** Minor

---

### 4. Static Data for Category Grid
- **Description:** The categories displayed in the `CategoryGrid` component on the Homepage are from a static, hardcoded data source.
- **Location(s):** `src/components/home/CategoryGrid.tsx`, `src/utils/data.ts`
- **Details/Expected vs. Actual:**
    - **Expected:** Categories might need to be managed dynamically (e.g., via an admin panel, fetched from a database).
    - **Actual:** Categories are imported from `categories` array in ` '@/utils/data' `.
- **Reproduction Steps:** View the Homepage. Observe the categories. Inspect `src/components/home/CategoryGrid.tsx`.
- **Suggested Severity:** Minor (for an MVP, static is okay, but a limitation for growth)

---

### 5. No Message for Empty Category Grid
- **Description:** If the `categories` array provided to `CategoryGrid` is empty, the section appears blank without any user-facing message.
- **Location(s):** `src/components/home/CategoryGrid.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** A message like "No categories available" should be displayed.
    - **Actual:** The grid area is empty if the source array is empty.
- **Reproduction Steps:** Modify `categories` in `src/utils/data.ts` to be an empty array. View the Homepage.
- **Suggested Severity:** Minor

---

### 6. Non-functional "Request Custom Service" Button
- **Description:** The "Request Custom Service" button in the `CategoryGrid` component is not interactive.
- **Location(s):** `src/components/home/CategoryGrid.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** This button should lead to a form or contact method for requesting services not listed.
    - **Actual:** The button has no `onClick` handler or defined action.
- **Reproduction Steps:** View the Homepage. Scroll to the end of the "Browse by Category" section. Attempt to click the "Request Custom Service" button.
- **Suggested Severity:** Minor (as it's an auxiliary feature)

---

### 7. Potentially Misleading "Featured Professionals" Logic
- **Description:** The `FeaturedArtisans` component displays a mix of actual featured artisans and a fixed slice of general artisans under one "Featured Professionals" heading.
- **Location(s):** `src/components/home/FeaturedArtisans.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** All artisans under "Featured Professionals" should be explicitly marked as featured, or the sectioning/titling should be clearer.
    - **Actual:** It shows the first 2 `featuredArtisans` and then the 3rd to 6th artisans from the global `artisans` list, regardless of their featured status.
- **Reproduction Steps:** Inspect the code in `src/components/home/FeaturedArtisans.tsx` and the logic for `featuredArtisans.slice(0, 2)` versus `artisans.slice(2, 6)`.
- **Suggested Severity:** Minor (UX improvement)

---

### 8. No Message for Empty Featured Artisans / Top Artisans
- **Description:** If no artisans qualify as "featured" or "top-rated", the respective sections on the Homepage might render empty without a specific user message.
- **Location(s):** `src/components/home/FeaturedArtisans.tsx`, `src/components/home/TopArtisansCarousel.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** A message like "No featured artisans available" or "No top-rated artisans yet" should be shown.
    - **Actual:** The sections will likely be blank or just show titles if the source arrays are empty after filtering/slicing.
- **Reproduction Steps:** Modify `artisans` data in `src/utils/data.ts` so that none are featured or none have high ratings. View the Homepage.
- **Suggested Severity:** Minor

---

### 9. Static Data for Featured and Top Artisans
- **Description:** Artisans for "Featured" and "Top Artisans" sections are derived from a static, hardcoded data source.
- **Location(s):** `src/components/home/FeaturedArtisans.tsx`, `src/components/home/TopArtisansCarousel.tsx`, `src/utils/data.ts`
- **Details/Expected vs. Actual:**
    - **Expected:** Artisan data, including featured status and ratings, would typically be dynamic.
    - **Actual:** All artisan data comes from ` '@/utils/data' `.
- **Reproduction Steps:** Observe artisan displays. Inspect code for data sources.
- **Suggested Severity:** Minor (MVP viability, but limits real-world use)

---

### 10. Hardcoded Title in TopArtisansCarousel
- **Description:** The title "Top Rated Artisans by Category" in `TopArtisansCarousel` is static.
- **Location(s):** `src/components/home/TopArtisansCarousel.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** If categories were dynamic or selectable for this carousel, the title should reflect that.
    - **Actual:** The title is hardcoded.
- **Reproduction Steps:** View the "Top Rated Artisans by Category" section on the Homepage.
- **Suggested Severity:** Minor

---

## Category Page Issues (`src/pages/Category.tsx`)

---

### 11. Non-functional Filter Buttons
- **Description:** The filter buttons ("Top Rated", "Nearest", etc.) on the Category Page are not interactive.
- **Location(s):** `src/pages/Category.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** Clicking these buttons should filter/sort the list of artisans displayed for the category. This is listed as "Optional but Recommended" in expected behavior.
    - **Actual:** Buttons are present but have no `onClick` functionality.
- **Reproduction Steps:** Navigate to any Category Page (e.g., by clicking a category on the homepage). Attempt to click any of the filter buttons.
- **Suggested Severity:** Minor (as it's an enhancement, but if shown, implies functionality)

---

### 12. "Back to categories" Link Navigates to Homepage
- **Description:** The "Back to categories" link on a Category Page navigates to the site's root (`/`) instead of a potentially more appropriate dedicated categories listing page (e.g., `/categories`).
- **Location(s):** `src/pages/Category.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** A more contextual back navigation, possibly to a page that lists all categories (which `/categories` seems to be, based on `CategoryGrid`'s "View All" link).
    - **Actual:** Link goes to the Homepage.
- **Reproduction Steps:** Navigate to a Category Page. Click the "Back to categories" link.
- **Suggested Severity:** Minor (UX refinement)

---

### 13. Potential Case Sensitivity for Category IDs
- **Description:** Category ID matching might be case-sensitive, leading to different outcomes for URLs like `/category/Plumbing` vs `/category/plumbing`.
- **Location(s):** `src/pages/Category.tsx` (dependent on `src/utils/data.ts`)
- **Details/Expected vs. Actual:**
    - **Expected:** Category ID matching should ideally be case-insensitive or IDs normalized to prevent users from landing on an erroneous "not found" page due to casing.
    - **Actual:** Behavior depends on `getCategoryById` and `filterArtisansByCategory` in `src/utils/data.ts`. Standard string comparisons are case-sensitive.
- **Reproduction Steps:** If a category ID is "plumbing", try navigating to `/category/Plumbing`.
- **Suggested Severity:** Minor (potential usability issue)

---

## Artisan Profile Page Issues (`src/pages/ArtisanProfile.tsx`)

---

### 14. Hardcoded Artisan Statistics and "Verified" Badge
- **Description:** Several key statistics on the Artisan Profile Page ("Member Since", "Experience", "Responds in", "Completion Rate") and the "Verified" badge are hardcoded.
- **Location(s):** `src/pages/ArtisanProfile.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** These details should be dynamically loaded from the artisan's data object. The "Verified" status should reflect `artisan.verified`.
    - **Actual:** Values like "May 2021", "7 years", "Within 2 hours", "98%" are static in the JSX. The "Verified" badge is always shown.
- **Reproduction Steps:** Navigate to any Artisan Profile page. Observe the stats section and the "Verified" badge. Inspect the code.
- **Suggested Severity:** Major (misrepresents artisan information, core details should be dynamic)

---

### 15. Missing Display of Individual Customer Reviews
- **Description:** The Artisan Profile Page does not display individual customer reviews (text, reviewer, date), only the average rating and review count.
- **Location(s):** `src/pages/ArtisanProfile.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** "Ratings and Reviews: Displays customer ratings and reviews for the artisan. Users should be able to read existing reviews."
    - **Actual:** Only an aggregate rating (`RatingStars` component and text like "4.5 (X reviews)") is shown. No list of individual reviews.
- **Reproduction Steps:** Navigate to any Artisan Profile page. Look for a section displaying individual customer reviews.
- **Suggested Severity:** Major (reading reviews is a key part of trusting an artisan)

---

### 16. Non-functional "Send Service Request" Button
- **Description:** The "Send Service Request" button on the Artisan Profile Page booking form does not perform any action.
- **Location(s):** `src/pages/ArtisanProfile.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** Clicking the button should submit the service request details (description, location, date, time) to a backend or initiate a workflow.
    - **Actual:** The button has no `onClick` handler.
- **Reproduction Steps:** Navigate to an Artisan Profile page. Fill in the "Request a Service" form. Click "Send Service Request".
- **Suggested Severity:** Major (core booking functionality impaired)

---

### 17. Non-functional Direct Contact Buttons
- **Description:** The "WhatsApp" and "Call" buttons on the Artisan Profile Page are not interactive.
- **Location(s):** `src/pages/ArtisanProfile.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** These buttons should initiate contact via WhatsApp or phone call, or at least display contact information.
    - **Actual:** The buttons have no `onClick` handlers or `href` attributes.
- **Reproduction Steps:** Navigate to an Artisan Profile page. Attempt to click the "WhatsApp" or "Call" buttons.
- **Suggested Severity:** Major (direct contact is a key feature)

---

### 18. Missing Portfolio/Gallery Section
- **Description:** The Artisan Profile Page does not have a section to showcase an artisan's portfolio or gallery of past work.
- **Location(s):** `src/pages/ArtisanProfile.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** "Portfolio/Gallery (Optional): If applicable to the artisan's trade, a section showcasing examples of their past work."
    - **Actual:** This section is not implemented.
- **Reproduction Steps:** Navigate to an Artisan Profile page. Look for a portfolio or gallery section.
- **Suggested Severity:** Minor (as it's listed as optional, but a valuable feature)

---

### 19. No Message for Empty Services List on Artisan Profile
- **Description:** If an artisan has no services listed (`artisan.services` is empty), their profile page renders an empty list without a specific message.
- **Location(s):** `src/pages/ArtisanProfile.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** A message like "No services listed by this artisan" could be shown for clarity.
    - **Actual:** An empty `<ul>` is rendered.
- **Reproduction Steps:** Modify an artisan's data in `src/utils/data.ts` to have `services: []`. View their profile.
- **Suggested Severity:** Minor

---

## Search Page Issues (`src/pages/Search.tsx`)

---

### 20. Missing Filtering/Sorting for Search Results
- **Description:** The Search Page does not offer any options to filter or sort the search results.
- **Location(s):** `src/pages/Search.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** "Filtering and Sorting: Similar to the Category Page, allowing users to refine search results (Optional but Recommended)."
    - **Actual:** No UI elements or logic for filtering or sorting search results are present.
- **Reproduction Steps:** Perform a search on the Search Page. Observe the lack of filter/sort options.
- **Suggested Severity:** Minor (as it's an enhancement, but expected behavior mentions it as recommended)

---

## Bookings Page Issues (`src/pages/Bookings.tsx`)

---

### 21. Lack of User Authentication for Bookings
- **Description:** The Bookings Page displays mock data and is not tied to a logged-in user, lacking actual authentication.
- **Location(s):** `src/pages/Bookings.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** "Requires Login: This page should only be accessible to logged-in users." Data should be specific to the authenticated user.
    - **Actual:** Displays global mock data. No authentication check.
- **Reproduction Steps:** Navigate to the Bookings page. Observe it shows predefined bookings.
- **Suggested Severity:** Critical (core feature for a user-specific page)

---

### 22. Missing Actions for Upcoming Bookings
- **Description:** The Bookings Page does not provide options to "Cancel" or "Reschedule" upcoming bookings.
- **Location(s):** `src/pages/Bookings.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** "Options to cancel or reschedule (if permitted by the platform rules and artisan policy)."
    - **Actual:** No buttons or UI elements for these actions are present on upcoming booking cards.
- **Reproduction Steps:** Navigate to the Bookings page, view an upcoming booking. Look for cancel/reschedule options.
- **Suggested Severity:** Major (key booking management functionality missing)

---

### 23. Missing Actions for Past Bookings
- **Description:** The Bookings Page does not provide options to "Re-book" or "Leave a review" for past bookings.
- **Location(s):** `src/pages/Bookings.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** "Option to re-book the same artisan/service. Option to leave a review for completed services."
    - **Actual:** No buttons or UI elements for these actions are present on past booking cards.
- **Reproduction Steps:** Navigate to the Bookings page, view a past booking. Look for re-book/leave review options.
- **Suggested Severity:** Major (key post-booking actions missing)

---

## Messages Page Issues (`src/pages/Messages.tsx`)

---

### 24. Lack of User Authentication for Messages
- **Description:** The Messages Page displays mock data and is not tied to a logged-in user, lacking actual authentication.
- **Location(s):** `src/pages/Messages.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** "Requires Login: This page should only be accessible to logged-in users." Conversations should be specific to the authenticated user.
    - **Actual:** Displays global mock conversation data. No authentication check.
- **Reproduction Steps:** Navigate to the Messages page. Observe it shows predefined conversations.
- **Suggested Severity:** Critical (core feature for a user-specific page)

---

### 25. Missing Message View Functionality
- **Description:** Users cannot select a conversation to view its full message history or send new messages. The page only lists conversations.
- **Location(s):** `src/pages/Messages.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** "Message View: When a conversation is selected: Displays the history of messages in chronological order. Provides an input field for the user to type and send new messages."
    - **Actual:** Conversation cards are styled as `cursor-pointer` but have no `onClick` action to open a detailed message view. No message sending input is available.
- **Reproduction Steps:** Navigate to the Messages page. Try to click on a conversation to open it.
- **Suggested Severity:** Critical (primary purpose of a messaging feature is absent)

---

### 26. Missing Initiate New Message Functionality
- **Description:** There is no way for a user to initiate a new conversation from the Messages Page.
- **Location(s):** `src/pages/Messages.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** "Initiate New Message (Optional): Ability to start a new conversation, perhaps by selecting an artisan from a list of previous bookings or contacts."
    - **Actual:** No button or UI element to start a new message thread.
- **Reproduction Steps:** Navigate to the Messages page. Look for an option to create a new message.
- **Suggested Severity:** Major (important messaging feature missing, though listed as optional in one place, it's standard)

---

### 27. Generic Icons for Conversation Participants
- **Description:** All conversation participants in the Messages list are shown with a generic user icon.
- **Location(s):** `src/pages/Messages.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** Ideally, profile pictures of the other party should be displayed.
    - **Actual:** A generic `User` icon is used for everyone.
- **Reproduction Steps:** Navigate to the Messages page. Observe the icons next to conversation names.
- **Suggested Severity:** Minor (UI refinement)

---

## Profile Page Issues (`src/pages/Profile.tsx`)

---

### 28. Lack of User Authentication for User Profile
- **Description:** The Profile Page displays a mock user object and is not tied to a logged-in user, lacking actual authentication.
- **Location(s):** `src/pages/Profile.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** "Requires Login: This page should only be accessible to logged-in users." Profile data should be for the authenticated user.
    - **Actual:** Displays a global mock `user` object. No authentication check.
- **Reproduction Steps:** Navigate to the Profile page. Observe it shows predefined user data.
- **Suggested Severity:** Critical (core feature for a user-specific page)

---

### 29. Non-functional "Edit Profile" Button
- **Description:** The "Edit Profile" button on the Profile Page does not allow users to modify their information.
- **Location(s):** `src/pages/Profile.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** "Edit Profile Information: Allows the user to update their editable profile information. Input fields for each editable piece of information. A 'Save Changes' button."
    - **Actual:** The button has no `onClick` handler and no editing form/modal appears.
- **Reproduction Steps:** Navigate to the Profile page. Click the "Edit Profile" button.
- **Suggested Severity:** Critical (fundamental profile management feature missing)

---

### 30. Non-functional Account Settings Buttons
- **Description:** Buttons for "Notification Preferences", "Payment Methods", "Security Settings", and "Sign Out" under Account Settings are not interactive.
- **Location(s):** `src/pages/Profile.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** These buttons should lead to respective sections for managing these settings or perform the sign-out action.
    - **Actual:** The buttons have no `onClick` handlers.
- **Reproduction Steps:** Navigate to the Profile page. Attempt to click on any of the buttons under "Account Settings".
- **Suggested Severity:** Major (key account management features are missing, Sign Out is Critical if auth was working)

---

### 31. Non-functional "Become an Artisan" Button
- **Description:** The "Become an Artisan" button on the Profile Page is not interactive.
- **Location(s):** `src/pages/Profile.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** Clicking this button should initiate a workflow for a user to register as an artisan.
    - **Actual:** The button has no `onClick` handler.
- **Reproduction Steps:** Navigate to the Profile page (ensure mock `user.isArtisan` is false). Click the "Become an Artisan" button.
- **Suggested Severity:** Major (key platform feature for user role change)

---

### 32. Static Empty States for Profile Activity Tabs
- **Description:** Tabs for "Booking History", "My Reviews", and "Favorites" on the Profile Page display static empty state messages and do not fetch or show any actual user data.
- **Location(s):** `src/pages/Profile.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** These tabs should display the authenticated user's actual booking history, written reviews, and favorited artisans.
    - **Actual:** They show messages like "You haven't made any bookings yet." with non-functional CTA buttons.
- **Reproduction Steps:** Navigate to the Profile page. Click through the "Booking History", "My Reviews", and "Favorites" tabs.
- **Suggested Severity:** Major (important user-specific information is missing)

---

### 33. Missing Specific "Change Password" and "Delete Account" Options
- **Description:** The Profile Page lacks explicit options for "Change Password" (though "Security Settings" is a placeholder) and "Delete Account".
- **Location(s):** `src/pages/Profile.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** "Account Settings: Change password functionality. Option to delete account (with appropriate warnings and confirmation)."
    - **Actual:** No direct "Change Password" button (could be under the non-functional "Security Settings"). No "Delete Account" button at all.
- **Reproduction Steps:** Navigate to the Profile page. Look for explicit "Change Password" or "Delete Account" options.
- **Suggested Severity:** Major (standard and important account management features)

---

### 34. Generic User Icon on Profile Page
- **Description:** The user's profile picture is represented by a generic user icon.
- **Location(s):** `src/pages/Profile.tsx`
- **Details/Expected vs. Actual:**
    - **Expected:** Users should be able to upload/manage a profile picture, which is then displayed.
    - **Actual:** A static generic `User` icon is shown. The mock data doesn't include an image URL, and edit functionality is missing.
- **Reproduction Steps:** Navigate to the Profile page. Observe the user icon.
- **Suggested Severity:** Minor (UI refinement, but profile pictures are standard)

---

## General / Cross-Page Issues

---

### 35. Reliance on Static Mock Data
- **Description:** Most pages and components rely on static, hardcoded data from `src/utils/data.ts` rather than fetching data from a backend or using dynamic sources.
- **Location(s):** Multiple components (e.g., `CategoryGrid.tsx`, `FeaturedArtisans.tsx`, `TopArtisansCarousel.tsx`, `Category.tsx`, `ArtisanProfile.tsx`, `Bookings.tsx`, `Messages.tsx`, `Profile.tsx`)
- **Details/Expected vs. Actual:**
    - **Expected:** In a production application, data for categories, artisans, bookings, messages, user profiles would be dynamic and fetched from a database via an API.
    - **Actual:** Data is imported from local TypeScript files.
- **Reproduction Steps:** Observe content on various pages. Inspect code for data sources.
- **Suggested Severity:** Critical (This is an architectural point; while it allows UI development, the app is not functional in a real-world sense without dynamic data and a backend.)

---

### 36. Missing Global State for Authentication
- **Description:** There's no clear indication or implementation of global authentication state management that user-specific pages (Bookings, Messages, Profile) would rely on.
- **Location(s):** App-wide, particularly affecting `src/pages/Bookings.tsx`, `src/pages/Messages.tsx`, `src/pages/Profile.tsx`.
- **Details/Expected vs. Actual:**
    - **Expected:** An authentication context or similar mechanism would provide user identity and protect routes.
    - **Actual:** User-specific pages use mock data and don't check for an authenticated user.
- **Reproduction Steps:** Navigate to Bookings, Messages, or Profile pages directly. No login is prompted.
- **Suggested Severity:** Critical (Fundamental for any application with user-specific data/features)

---
