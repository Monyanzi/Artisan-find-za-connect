# Test Cases and Findings

This document outlines test cases for various components and findings from code analysis against these test cases.

## Homepage (`src/pages/Index.tsx`)

### Expected Behavior (from `documentation/expected_behavior.md`)
- **Hero Section:** Displays a prominent hero section with a captivating image or video and a clear call to action.
- **Categories List:** Shows a list of available service categories (e.g., plumbing, electrical, carpentry). Each category should be clickable, leading to the respective Category Page.
- **Featured Artisans:** Highlights a selection of top-rated or new artisans. Each featured artisan should be clickable, leading to their Artisan Profile Page.
- **Search Bar:** A clearly visible search bar allowing users to initiate a search for artisans or services.

### Sub-components Analysis:

#### 1. `src/components/home/Hero.tsx`
   - **Standard Input:**
     - Displays a background image/video.
     - Displays a heading/title.
     - Displays a subheading/description.
     - Displays a call-to-action button.
   - **Edge Cases:**
     - Very long title or subheading: Does the text wrap correctly? Is it still readable?
     - No call-to-action text provided: Is the button hidden or does it show a default text?
     - Image/video fails to load: Is there a fallback or placeholder?
   - **Error Conditions:**
     - Props for title, subheading, button text, or image/video URL are undefined.
   - **Code Analysis & Findings:**
     - The component uses a static background image URL: `bg-[url('/lovable-uploads/8785989a-e088-46b1-9e6d-77220291abbf.png')]`. This should ideally be configurable via props.
     - **Text Wrapping:** Tailwind CSS classes are used, which generally handle text wrapping well. However, extremely long text in `h1` or `p` tags should be manually tested on different screen sizes to ensure readability.
     - **Call to Action:** The main call to action is the `SearchBar`. There isn't a separate button as typically envisioned in a "Hero" section CTA, but the search bar itself serves this purpose.
     - **Missing Props:** The component does not accept props for title, subheading, or background image. These are hardcoded. If these were to be dynamic, it would require refactoring.
     - **Error Handling for Image:** No explicit fallback for the background image if it fails to load (standard browser behavior will occur, likely showing nothing or a broken image icon in the background).
     - **Popular Links:** "Popular" links (Plumbing, Electrical, etc.) are hardcoded. These should ideally be dynamic or configurable. Clicking them currently does nothing as they are `Button` components with `variant="link"` but no `onClick` handler or `href`.
     - The "Learn how it works" link also doesn't have a navigation action.
     - `useApp()` context provides `searchTerm` and `setSearchTerm` for the `SearchBar`. This is good for state management.
     - **Data Source:** Categories are imported from `@/utils/data`. This is a static data source.
     - **Display:** It maps over the `categories` array and renders a `CategoryCard` for each. `CategoryCard` component would need its own analysis for how it handles individual category data.
     - **Large Number of Categories:** The current layout uses a grid that wraps. `grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6`. This is responsive. If there are significantly more categories than can fit, users will have to scroll the page. No pagination is implemented within the grid itself.
     - **Long Category Names:** `CategoryCard` would be responsible for handling long names. This needs to be checked at the `CategoryCard` component level.
     - **Empty Array:** If `categories` array from `@/utils/data` is empty, the `map` function will simply render nothing in that grid section. There is no explicit message like "No categories available". This is a potential UI improvement.
     - **Malformed Data:** If a category object is missing `id` (for `key` prop) or other properties expected by `CategoryCard`, it might lead to runtime errors or visual bugs in the `CategoryCard`. The `CategoryCard` should be robust to missing optional fields. `key={category.id}` is good.
     - **"View All" Link:** Links to `/categories`. This is good.
     - **"Request Custom Service" Button:** This button exists but currently has no `onClick` handler or defined action.
     - **Data Source:** Artisans are imported from `@/utils/data`.
     - **Filtering:** It filters for `artisan.featured === true` to get `featuredArtisans`. Then it `slice(0, 2)` to display the first two in a `md:grid-cols-2` layout using a "featured" variant of `ArtisanCard`.
     - **Additional Artisans:** It then takes another slice `artisans.slice(2, 6)` (these are *not* necessarily featured, it's just the 3rd to 6th artisans from the *original* `artisans` list) and displays them in a different grid layout. This logic seems a bit mixed: "Featured Professionals" section title implies all artisans shown should be featured. Displaying non-featured artisans, or a fixed slice regardless of their featured status, might be misleading.
     - **Empty Array:**
       - If `artisans.filter(artisan => artisan.featured === true)` results in an empty array, `featuredArtisans.slice(0, 2)` will be empty, and that part of the section won't render artisans.
       - If the main `artisans` array is empty or has fewer than 6 items, `slice` will handle it gracefully (returning an empty array or fewer items), and the `map` will render nothing or fewer items. No specific "No featured artisans" message is displayed.
     - **Malformed Data:** If artisan objects are malformed (e.g., missing properties expected by `ArtisanCard`), it could lead to errors or visual issues within the `ArtisanCard` component. `key={artisan.id}` is used.
     - **"View All" Link:** Links to `/artisans`. This is good.
     - `ArtisanCard` variant `featured` is used for the first two. The implications of this variant would need to be checked in `ArtisanCard` itself.
     - **Data Source:** Artisans are imported from `@/utils/data`.
     - **Filtering/Sorting:** `artisans.sort((a, b) => b.rating - a.rating).slice(0, 8)` gets the top 8 artisans by rating.
     - **Display:** Uses `Carousel` component from `@/components/ui/carousel`. Each item is a `TopArtisanCard`.
     - **`TopArtisanCard` Analysis:**
       - **Image Fallback:** `src={artisan.profileImage || artisan.image || '/placeholder.svg'}` provides a good fallback for images.
       - **Category Display:** `artisan.category.split('-').map(...).join(' ')` attempts to format category names like "electrician-services" to "Electrician Services". This is good but assumes a specific string format. If `artisan.category` is not a string or doesn't contain '-', it will just display the category as is.
       - **Review Count:** `artisan.reviewCount || artisan.reviews.length` provides a fallback for review count. Assumes `artisan.reviews` is an array if `reviewCount` is not present.
       - **Location, Joined Date:** Displays these fields. `artisan.joinedDate || 'Jan 2023'` provides a fallback for joined date.
       - **Specialties/Skills:** `artisan.specialties ? artisan.specialties.slice(0, 3).map(...) : artisan.skills && artisan.skills.slice(0, 3).map(...)` displays up to 3 specialties or skills. This is a good way to handle potentially long lists and provides a fallback from `specialties` to `skills`.
       - **Missing Data in `TopArtisanCard`:** The card attempts to access `artisan.name`, `artisan.rating`, `artisan.location`, `artisan.id`. If these are missing, it might display undefined or cause minor visual issues. Robustness depends on how these missing fields are handled by the basic HTML/React rendering (e.g., an undefined name might just be a blank space). `artisan.id` is crucial for the link `to={`/artisan/${artisan.id}`}`.
     - **Carousel Behavior:**
       - **Fewer than X Artisans:** If `topArtisans` has fewer items than the typical view (e.g. < 4 for lg screens), the carousel will still work but might show empty spaces or fewer items per view. The `Carousel` component itself would determine how it handles this. Navigation controls (`CarouselPrevious`, `CarouselNext`) might still be active or become disabled by the `carousel` component logic if not enough items to scroll.
       - **Empty Array:** If `topArtisans` is empty (e.g., `artisans` data is empty), the `map` function will render no `CarouselItem`s. The carousel structure will be there but contain no slides. No explicit message like "No top artisans available" is displayed. The section title "Top Rated Artisans by Category" would still show.
     - **"View All Artisans" Link:** Links to `/search`. This seems reasonable.
     - **Hardcoded Title:** "Top Rated Artisans by Category" is a static title. Ideally, if categories were selectable or dynamic, this title might need to change.

#### 2. `src/components/home/CategoryGrid.tsx`
   - **Standard Input:**
     - Receives a list of category objects (e.g., `{ name: "Plumbing", icon: "icon_url", link: "/category/plumbing" }`).
     - Displays each category as a clickable item (e.g., card, link).
     - Each item shows the category name and icon.
     - Clicking an item navigates to the specified link.
   - **Edge Cases:**
     - Large number of categories: How is the layout handled? (e.g., pagination, scrolling).
     - Category names are very long: Does the text wrap or get truncated?
     - No categories provided (empty array): What is displayed? (e.g., a message like "No categories available").
   - **Error Conditions:**
     - The `categories` prop is undefined.
     - Category objects in the array are malformed (e.g., missing `name`, `icon`, or `link`).
   - **Code Analysis & Findings:**
     - *(Will be filled after reading the source code)*

#### 3. `src/components/home/FeaturedArtisans.tsx`
   - **Standard Input:**
     - Receives a list of artisan objects (e.g., `{ name: "John Doe", specialty: "Electrician", rating: 4.5, image: "image_url", profileLink: "/artisan/john-doe" }`).
     - Displays each artisan in a card or similar format.
     - Each card shows artisan's name, specialty, rating, and image.
     - Each card is clickable and navigates to the artisan's profile.
   - **Edge Cases:**
     - No featured artisans provided (empty array): What is displayed? (e.g., a message "No featured artisans currently").
     - Artisan names or specialties are very long.
     - Ratings are in unexpected formats (e.g., not numbers, or outside 0-5 range).
   - **Error Conditions:**
     - The `artisans` prop is undefined.
     - Artisan objects in the array are malformed (e.g., missing `name`, `specialty`, `image`, or `profileLink`).
   - **Code Analysis & Findings:**
     - *(Will be filled after reading the source code)*

#### 4. `src/components/home/TopArtisansCarousel.tsx`
   - **Standard Input:**
     - Receives a list of top artisan objects (similar to `FeaturedArtisans`).
     - Displays artisans in a carousel/slider format.
     - Carousel has navigation controls (next/previous).
     - Each artisan card in the carousel is clickable.
   - **Edge Cases:**
     - Number of artisans is less than the number typically displayed in a carousel view: Does it still function correctly? Are controls hidden?
     - No top artisans provided (empty array): Is the carousel hidden or does it show a message?
   - **Error Conditions:**
     - The `artisans` prop is undefined.
     - Artisan objects are malformed.
     - Carousel library specific errors (if any).
   - **Code Analysis & Findings:**
     - *(Will be filled after reading the source code)*

---

## Category Page (`src/pages/Category.tsx`)

### Expected Behavior (from `documentation/expected_behavior.md`)
- **Category Title:** Displays the name of the selected category.
- **Artisan List:** Lists all artisans belonging to the selected category.
    - Each artisan entry should display their name, a brief description of their services, their average rating, and a profile picture. (Handled by `ArtisanCard`)
    - Clicking on an artisan entry should navigate the user to the Artisan Profile Page for that artisan. (Handled by `ArtisanCard`)
- **Filtering and Sorting (Optional but Recommended):**
    - Users should be able to filter artisans by sub-categories (if applicable), location, availability, or other relevant criteria.
    - Users should be able to sort artisans by rating, price range (if available), or name.

### Test Cases:
   - **Standard Input:**
     - URL like `/category/plumbing` (valid category ID):
       - Displays "Plumbing" as the title (or the correct category name).
       - Displays the category icon and description.
       - Lists all artisans associated with "plumbing".
       - Each artisan is displayed using `ArtisanCard`.
     - Category with a single artisan: Displays that one artisan correctly.
     - Category with many artisans: Displays all artisans, layout should be responsive (grid wraps).
   - **Edge Cases:**
     - Category with zero artisans (e.g., `/category/newly-added-empty-category`):
       - Displays category title and description.
       - Displays a message like "No artisans found in this category."
     - Category ID in URL is valid but has different casing (e.g., `/category/Plumbing` vs `/category/plumbing`): Behavior depends on `getCategoryById` and `filterArtisansByCategory` string matching logic (ideally case-insensitive or normalized).
   - **Error Conditions:**
     - Invalid category ID in URL (e.g., `/category/non-existent-category`):
       - Displays a "Category not found" message.
       - Provides a link back to home or categories page.
     - `id` from `useParams` is undefined: The component should handle this, likely by `getCategoryById(null)` and `filterArtisansByCategory(null)`.
     - Data for artisans (from `filterArtisansByCategory`) is malformed (e.g., array items are not valid artisan objects): `ArtisanCard` would be responsible for handling malformed individual artisan data. If the array itself is not an array, it could cause a runtime error when calling `.map`.
     - `category` object from `getCategoryById` is malformed (e.g., missing `name`, `icon`, `description`): May lead to display issues or runtime errors if properties are accessed directly without checks.

### Code Analysis & Findings:
   - **Data Fetching & Display:**
     - Uses `useParams<{ id: string }>()` to get the category ID from the URL.
     - `useEffect` hook sets the `selectedCategory` in `AppContext`. This is good for global state if other components need to know the current category. It also correctly clears it on unmount.
     - `category = getCategoryById(id || null)`: Fetches category details. Handles `id` being potentially undefined by passing `null`.
     - `artisans = filterArtisansByCategory(id || null)`: Fetches artisans for the category. Also handles `id` being `null`.
     - **Category Not Found:** If `!category`, it correctly displays a "Category not found" message with a link back home. This matches the error condition test case.
     - **Category Title & Description:** If category is found, it displays `category.name`, `category.icon` (dynamically creating the element), and `category.description`. This matches expected behavior.
       - **Icon Rendering:** `React.createElement(category.icon, { size: 24 })` is a flexible way to render icon components if `category.icon` stores a component reference. Assumes `category.icon` is a valid React component type.
     - **Artisan List:**
       - If `artisans.length > 0`, it maps over them and renders an `ArtisanCard` for each. `key={artisan.id}` is correctly used.
       - If `artisans.length === 0`, it correctly displays a "No artisans found in this category." message. This matches the edge case.
   - **Filtering and Sorting:**
     - Placeholder filter buttons ("Top Rated", "Nearest", "Verified Only", "Quick Response") are present.
     - These buttons currently have no `onClick` functionality and do not interact with the `artisans` list. This is an area for future implementation as per the "Optional but Recommended" part of expected behavior.
   - **Links:**
     - "Back to categories" link navigates to `/`. This should ideally go to a main categories listing page if one exists (e.g. `/categories`), rather than the homepage, for better navigation context. The current `CategoryGrid` on homepage links to `/categories` for "View All", so there's a slight inconsistency or assumption that home is the category list.
   - **Data Source:** Relies on static data from ` '@/utils/data' ` via `getCategoryById` and `filterArtisansByCategory`.
   - **Case Sensitivity for ID:** The behavior with different casing for category IDs (e.g., `/category/Plumbing` vs `/category/plumbing`) depends entirely on the implementation of `getCategoryById` and `filterArtisansByCategory` in ` '@/utils/data' `. If these functions use case-sensitive matching for IDs (which strings are by default), then "Plumbing" and "plumbing" would be treated as different categories. Ideally, IDs should be matched case-insensitively or normalized.
   - **Malformed Data Handling:**
     - If `category` is found but is malformed (e.g., `name` is undefined), it will likely render `undefined` or cause an error if a property is expected to be a specific type (like `icon` being a component). No explicit checks for malformed category fields are present beyond the initial `!category` check.
     - Robustness to malformed artisan data within the `artisans` array is delegated to `ArtisanCard`.

---

## Artisan Profile Page (`src/pages/ArtisanProfile.tsx`)

### Expected Behavior (from `documentation/expected_behavior.md`)
- **Artisan Information:**
    - Name and profile picture.
    - Detailed description of skills, experience, services.
    - Service area or location.
    - Contact information (potentially masked).
- **Services List:** Clear list of services, potentially with pricing.
- **Ratings and Reviews:** Display customer ratings/reviews. Ability to read existing.
- **Booking Section:** CTA to book/request service (calendar, form, or contact initiation).
- **Portfolio/Gallery (Optional):** Showcase past work.

### Test Cases:
   - **Standard Input:**
     - URL like `/artisan/artisan-1` (valid ID):
       - Displays artisan's name, profile picture (with fallback), primary skill/profession.
       - Shows location, rating (stars and text), member since date.
       - Shows stats like experience, response time, completion rate (currently hardcoded).
       - Displays "About" section with `artisan.description`.
       - Lists services from `artisan.services`.
       - Lists skills from `artisan.skills`.
       - "Request a Service" form is present.
       - Direct contact buttons (WhatsApp, Call) are present.
     - Artisan with some optional fields missing (e.g., no `artisan.image`, `artisan.skills` is empty/null):
       - Profile picture falls back to `/placeholder.svg`.
       - Skills section shows "No skills listed" or similar.
   - **Edge Cases:**
     - Invalid artisan ID in URL (e.g., `/artisan/non-existent-artisan`):
       - Displays "Artisan Not Found" message.
     - Artisan with no services listed (`artisan.services` is empty):
       - Services list should be empty or show a message like "No services listed".
     - Artisan with no reviews (`artisan.reviews` is empty or undefined):
       - Rating display should handle this (e.g., "0 reviews", or rating not shown).
     - `artisan.description` is very long: Text should wrap correctly.
     - `artisan.skills` or `artisan.services` contain very many items: Layout should handle lists gracefully.
   - **Error Conditions:**
     - `id` from `useParams` is undefined: `getArtisanById(undefined)` returns `null`, so "Artisan Not Found" message is shown.
     - `artisan` object (from `getArtisanById`) is found but malformed (e.g., `name` is undefined, `services` is not an array):
       - May display "undefined" for text fields.
       - May cause runtime error if trying to `.map` a non-array (e.g., for services/skills).
     - Image URL for `artisan.image` is broken: `img` tag's `alt` text should be visible, or the fallback `/placeholder.svg` should load.
     - Data for stats (Experience, Responds in, Completion Rate, Member Since) is currently hardcoded and not from `artisan` object.

### Code Analysis & Findings:
   - **Data Fetching & Display:**
     - Uses `useParams<{ id: string }>()` to get artisan ID.
     - `artisan = getArtisanById(id)` fetches artisan data from static `artisans` list in ` '@/utils/data' `.
     - **Artisan Not Found:** If `!artisan`, correctly displays "Artisan Not Found" message.
     - **Artisan Info:**
       - Displays `artisan.name`.
       - Profile picture: `artisan.image || '/placeholder.svg'` provides a fallback.
       - Primary Skill: `artisan.skills?.[0] || 'Professional Service Provider'` shows the first skill or a generic title.
       - Location: `artisan.location`.
       - Rating: Uses `RatingStars` component. Displays `artisan.rating` and `artisan.reviews?.length || 0` for review count. Handles potentially undefined `reviews`.
       - "Verified" badge is static and always shown. Should be data-driven (`artisan.verified`).
       - **Hardcoded Stats:** "Member Since" (May 2021), "Experience" (7 years), "Responds in" (Within 2 hours), "Completion Rate" (98%) are all hardcoded. These should come from the `artisan` object.
     - **About Section:** Displays `artisan.description`.
     - **Services List:** Maps `artisan.services` to list items. If `artisan.services` is empty, it will render an empty `ul`. No specific message for "No services listed".
     - **Skills List:** Maps `artisan.skills` to badges. If `artisan.skills` is null or empty, it displays "No skills listed". This is good.
   - **Booking Section ("Request a Service"):**
     - A form with fields for "Service Description", "Your Location", "Preferred Date", and "Preferred Time" (dropdown) is present.
     - State for these fields (`serviceDescription`, `location`, `date`) is managed with `useState`. Time is a standard select, not state-managed directly in this snippet but its value would be part of form submission.
     - "Send Service Request" button is present. Currently, it does not have an `onClick` handler to perform any action with the form data.
     - Informational text about artisan response is present.
   - **Direct Contact:**
     - "WhatsApp" and "Call" buttons are present. They are `Button` components with `variant="outline"` but no `onClick` handlers or `href` attributes to initiate contact.
   - **Reviews Section:**
     - **Missing:** The page currently does **not** display any actual customer reviews (list of review texts, reviewer names, dates). The "Expected Behavior" requires displaying customer ratings *and reviews*. It only shows the average rating and count.
   - **Portfolio/Gallery:**
     - **Missing:** No section for a portfolio or gallery of past work is present. This is an optional feature as per expected behavior.
   - **Data Source:** All artisan data comes from the static `artisans` array in ` '@/utils/data' `.
   - **Malformed Data Handling:**
     - If `artisan` object fields are missing (e.g. `artisan.name` is undefined), it will likely render `undefined` or empty strings.
     - If `artisan.services` or `artisan.skills` is not an array (and not null/undefined for skills), the `.map` calls would cause a runtime error. The current `artisans` data structure seems to use arrays, so this is okay with current data.
     - `artisan.image || '/placeholder.svg'` handles missing image.
   - **Sub-components:** Uses common `RatingStars`, `Button`, `Badge`, `Textarea`, `Input`. No complex, page-specific sub-components are immediately apparent beyond the structure of this page itself.

---

## Search Page (`src/pages/Search.tsx`)

### Expected Behavior (from `documentation/expected_behavior.md`)
- **Search Input:** An input field where users can type their search query.
- **Search Results:** Displays a list of artisans or services that match the search term.
    - Results should be relevant.
    - Each result item provides enough information (handled by `ArtisanCard`).
    - Clicking a result leads to Artisan Profile Page (handled by `ArtisanCard`).
- **No Results Message:** Clear message if no results are found.
- **Filtering and Sorting:** Similar to Category Page (Optional but Recommended).

### Test Cases:
   - **Standard Input:**
     - Search term matching multiple artisans (e.g., "Plumber"):
       - Displays a list of matching artisans using `ArtisanCard`.
       - Shows count like "X artisans found".
     - Search term matching one artisan:
       - Displays one `ArtisanCard`.
       - Shows "1 artisan found".
     - Search term matching no artisans (e.g., "XyzAbc"):
       - Shows message "No artisans found matching your search" or similar.
       - Includes the search term in the "no results" message (e.g. "No artisans found matching 'XyzAbc'").
   - **Edge Cases:**
     - Empty search term (`searchTerm` is empty string):
       - Should ideally show a prompt to enter a search term, or list all artisans (current behavior is a prompt).
     - Search term with common special characters (e.g., "O'Malley", "Smith & Co."): Search logic should handle or sanitize these.
     - Very long search term: Input field should handle it; search logic performance might be a concern (not testable here).
     - Case sensitivity: Search for "plumber" vs "Plumber" - ideally case-insensitive. (Depends on `filterArtisansBySearch` logic).
   - **Error Conditions:**
     - `filterArtisansBySearch` itself has an error: The page might crash if not handled within the function. (Not testable here).
     - Malformed data in `results` array items (if not caught by `ArtisanCard`): Could lead to errors in `ArtisanCard` rendering.
     - `searchTerm` from `useApp()` is initially undefined (though context usually provides a default like `''`): `useEffect` should handle it gracefully.

### Code Analysis & Findings:
   - **Search Input & Term Handling:**
     - Uses `SearchBar` component, which presumably gets `value={searchTerm}` and `onChange={setSearchTerm}` from `useApp()` context. This is good for central state management of the search term.
     - The page title is "Search Artisans".
   - **Search Logic & Results Display:**
     - `useEffect` hook calls `filterArtisansBySearch(searchTerm)` whenever `searchTerm` changes and updates the `results` state.
     - `filterArtisansBySearch` is imported from ` '@/utils/data' `, meaning the actual search logic (matching fields, case sensitivity, etc.) resides there.
     - **Results Count:** Displays `"${results.length} artisans found"` if results exist, which is good.
     - **Displaying Results:** If `results.length > 0`, it maps over `results` and renders an `ArtisanCard` for each. `key={artisan.id}` is correctly used.
   - **No Results Message:**
     - If `results.length === 0` AND `searchTerm` is not empty, it displays:
       - A general message: `"No artisans found matching your search"` as part of the results count heading.
       - A more specific message in the body: `"No artisans found matching "{searchTerm}""` and suggests adjusting terms or browsing categories. This is excellent.
     - If `searchTerm` is empty, it displays: `"Enter a search term to find artisans by name, skill, or location."` This handles the empty search term edge case well.
   - **Filtering and Sorting:**
     - **Missing:** No UI elements or logic for filtering (e.g., by sub-category, location within results) or sorting (e.g., by rating, name) search results are present. This was an optional but recommended feature.
   - **Data Source:** Relies on static data via `filterArtisansBySearch` from ` '@/utils/data' `. The effectiveness of search (relevance, fields searched) depends entirely on this function.
   - **Case Sensitivity & Special Characters:** Behavior depends on `filterArtisansBySearch`. If it's a simple `string.includes()` or `string.toLowerCase().includes()`, it might handle basic cases. More complex tokenization or fuzzy matching is not evident from this component.
   - **Malformed Data Handling:**
     - If `filterArtisansBySearch` returns malformed artisan objects, the robustness is delegated to `ArtisanCard`.
     - The component itself seems robust to `searchTerm` being initially empty or `results` being an empty array.
   - **Sub-components:** Uses `SearchBar` (common) and `ArtisanCard` (common). No specific complex sub-components for this page.

---

## Bookings Page (`src/pages/Bookings.tsx`)

### Expected Behavior (from `documentation/expected_behavior.md`)
- **Requires Login:** Page accessible to logged-in users.
- **Upcoming Bookings:**
    - List of services yet to be completed.
    - Show artisan name, service details, date/time, status.
    - Options to cancel/reschedule.
- **Past Bookings:**
    - List of completed/canceled services.
    - Show artisan details, service, date, final status.
    - Option to re-book.
    - Option to leave a review.

### Test Cases:
   - **Standard Input:**
     - User with upcoming bookings only:
       - "Upcoming" tab shows bookings with details (artisan, service, date, time, location, status).
       - "Past" tab shows "You have no past bookings."
     - User with past bookings only:
       - "Upcoming" tab shows "You have no upcoming bookings."
       - "Past" tab shows bookings with details.
     - User with both upcoming and past bookings: Both tabs populated.
     - User with no bookings at all: Both tabs show respective "no bookings" messages.
   - **Edge Cases:**
     - A booking object with missing optional fields (e.g., location not provided, though current mock data has it): How the `renderBookingCard` handles it.
     - Very long service name or artisan name: Text wrapping in card.
     - Bookings with various statuses: `getStatusBadgeClass` should apply correct styling.
   - **Error Conditions:**
     - `upcomingBookings` or `pastBookings` arrays are undefined (if fetching failed, though current is mock data): Page should ideally not crash, perhaps show an error or empty state.
     - Individual booking objects are malformed (e.g., missing `id`, `service`, `artisanName`): May lead to display issues or errors in `renderBookingCard`.
   - **Authentication:**
     - The page is user-specific. How is user authentication handled? (Current code uses mock data, so no auth is implemented here).

### Code Analysis & Findings:
   - **Data Source & Structure:**
     - Uses hardcoded mock data for `upcomingBookings` and `pastBookings`.
     - Each booking object has `id`, `artisanName`, `service`, `date`, `time`, `location`, and `status`. This matches most of the expected details.
   - **Tabs for Navigation:**
     - Uses `Tabs` component (`@/components/ui/tabs`) to switch between "Upcoming" and "Past" bookings. This is a good UI choice.
     - `activeTab` state is managed but not explicitly used beyond `onValueChange` for the `Tabs` component.
   - **Displaying Bookings (`renderBookingCard`):**
     - Each booking is rendered in a `Card` component.
     - Displays `booking.service`, `booking.artisanName`, `booking.date`, `booking.time`, `booking.location`.
     - **Status Display:** `booking.status` is displayed with a dynamic badge class from `getStatusBadgeClass`. This is good for visual distinction.
       - `getStatusBadgeClass` maps statuses ('confirmed', 'pending', 'completed') to CSS classes. It has a default 'badge-outline'.
   - **Handling No Bookings:**
     - If `upcomingBookings.length === 0`, it displays "You have no upcoming bookings."
     - If `pastBookings.length === 0`, it displays "You have no past bookings."
     - This correctly handles the "user with no bookings" scenario for each tab.
   - **Missing Features (as per Expected Behavior):**
     - **Authentication:** No actual user authentication is implemented. The page displays mock data that is not tied to a logged-in user. This is a critical feature for a real bookings page.
     - **Upcoming Bookings - Actions:**
       - No options to "Cancel" or "Reschedule" a booking are present in the UI or code.
     - **Past Bookings - Actions:**
       - No option to "Re-book" an artisan/service.
       - No option to "Leave a review" for completed services.
   - **Malformed Data Handling:**
     - If a booking object is missing properties accessed in `renderBookingCard` (e.g., `booking.service`), it would render `undefined` or cause an error if a property is expected (e.g., `booking.status.charAt(0)` if status is undefined). The current mock data is complete.
     - If `upcomingBookings` or `pastBookings` were `undefined` instead of an empty array, the `.length` access would cause an error. The component initializes them as empty arrays which is safer if data fetching were to fail and return undefined.
   - **Sub-components:** Uses `Tabs`, `Card` from UI library. `renderBookingCard` is an internal rendering helper.

---

## Messages Page (`src/pages/Messages.tsx`)

### Expected Behavior (from `documentation/expected_behavior.md`)
- **Requires Login:** Page accessible to logged-in users.
- **Conversation List:**
    - Displays list of ongoing conversations.
    - Indicate other party, snippet of last message.
    - Unread messages clearly highlighted.
- **Message View (When conversation selected):**
    - History of messages in chronological order.
    - Input field to type and send new messages.
    - Timestamps for messages.
- **Initiate New Message (Optional):** Ability to start new conversation.

### Test Cases:
   - **Standard Input:**
     - User with multiple conversations:
       - Lists all conversations. Each shows name, last message snippet, time.
       - Unread conversations are visually distinct.
     - User with one conversation: Lists that one conversation.
     - User with no conversations: Shows "You have no messages yet."
   - **Edge Cases:**
     - Conversation with a very long last message: Snippet should truncate gracefully.
     - Conversation with special characters in name or message: Should display correctly (though HTML injection is a concern if not sanitized, not testable here).
     - `conversation.time` has various formats (e.g., "2 hours ago", "Yesterday", "3 days ago"): Should display as provided.
   - **Error Conditions:**
     - `conversations` array is undefined (if fetching failed): Page should ideally show error or empty state.
     - Individual conversation objects are malformed (e.g., missing `id`, `name`, `lastMessage`): May lead to display issues or errors.
   - **Authentication:**
     - Page is user-specific. How is user authentication handled? (Current code uses mock data).

### Code Analysis & Findings:
   - **Data Source:**
     - Uses hardcoded mock data for `conversations`. Each object has `id`, `name`, `lastMessage`, `time`, and `unread`.
   - **Conversation List Display:**
     - If `conversations.length > 0`, it maps through them and renders each in a `Card`.
     - Each card displays:
       - Artisan/User name (`conversation.name`) with a generic `User` icon.
       - Last message snippet (`conversation.lastMessage`), which is truncated using `truncate` Tailwind class.
       - Time of last message (`conversation.time`) with a `Clock` icon.
     - **Unread Messages:**
       - If `conversation.unread` is true, the card gets a left border (`border-l-4 border-primary`).
       - A small dot (`<span className="ml-2 w-2 h-2 bg-primary rounded-full"></span>`) is shown next to the name for unread messages. This is good highlighting.
     - Cards are `cursor-pointer`, implying they should be clickable to open a message view, but no `onClick` handler is attached to the `Card` itself to navigate or change state.
   - **Handling No Conversations:**
     - If `conversations.length === 0`, it correctly displays "You have no messages yet."
   - **Missing Features (as per Expected Behavior):**
     - **Authentication:** Like Bookings page, this is user-specific and currently uses global mock data. No auth is implemented.
     - **Message View:**
       - **No functionality to select a conversation and view its full message history.** This is a primary part of the expected behavior. The current page only shows the list of conversations.
       - Consequently, there's no input field to send new messages within a selected conversation.
     - **Timestamps for individual messages (within a conversation view):** Not applicable yet as there's no conversation view. The list view shows a relative time for the *last* message.
     - **Initiate New Message:** No functionality to start a new conversation.
   - **Malformed Data Handling:**
     - If a conversation object is missing properties (e.g., `name`, `lastMessage`), it would render `undefined` or empty. `unread` being missing would default to not showing unread indicators.
     - If `conversations` array were `undefined`, `.length` access would error. Initializing with `[]` is safer.
   - **Potential Issues:**
     - The generic `User` icon for each conversation participant. Ideally, it would show the artisan's or user's profile picture.
     - `conversation.time` is a string like "2 hours ago". This would require a robust date/time library in a real application to keep these relative times accurate or to display absolute timestamps.

---

## Profile Page (`src/pages/Profile.tsx`)

### Expected Behavior (from `documentation/expected_behavior.md`)
- **Requires Login:** Page accessible to logged-in users.
- **View Profile Information:** Display user's name, email, phone, profile picture, location.
- **Edit Profile Information:** Allow updates to editable info with a save button.
- **Account Settings:**
    - Change password.
    - Notification preferences.
    - Payment methods.
    - Delete account.
- **Artisan Profile (if applicable):** Toggle/link to manage artisan-specific profile.

### Test Cases:
   - **Standard Input:**
     - View profile: Displays user's mock data (name, email, phone, join date, location). Generic user icon shown.
     - Edit Profile button: Exists. (Functionality not implemented).
     - Account Settings buttons (Notification, Payment, Security, Sign Out): Exist. (Functionality not implemented).
     - "Become an Artisan" button: Shown if `user.isArtisan` is false. (Functionality not implemented).
     - Tabs (Booking History, My Reviews, Favorites): Present. Each shows an empty state message.
   - **Edge Cases (for Edit Profile if it were functional):**
     - Submitting form with empty required fields.
     - Invalid email format.
     - Invalid phone format.
   - **Error Conditions (for Edit Profile if it were functional):**
     - Saving profile data fails on the backend.
     - Data for tabs (bookings, reviews, favorites) fails to load (currently mock empty states).
   - **Authentication:**
     - Page is user-specific. How is authentication handled? (Current code uses mock `user` object).

### Code Analysis & Findings:
   - **Data Source:**
     - Uses a hardcoded mock `user` object containing `name`, `email`, `phone`, `joinDate`, `location`, and `isArtisan`.
   - **Display Profile Information:**
     - Correctly displays the mock user's name, join date, email, phone, and location.
     - Uses a generic `User` icon instead of a profile picture.
     - "Edit Profile" button is present but has no `onClick` handler or associated form/modal for editing.
   - **Account Settings:**
     - Section with "Account Settings" title.
     - Buttons for "Notification Preferences", "Payment Methods", "Security Settings", and "Sign Out" are present.
     - These are `Button` components with `variant="ghost"` and no `onClick` handlers, so they are not functional.
     - "Sign Out" button is styled with `text-destructive`.
   - **"Become an Artisan" Button:**
     - Displayed conditionally based on `!user.isArtisan`.
     - This button also has no `onClick` handler.
   - **User Activity Tabs (Booking History, My Reviews, Favorites):**
     - Uses `Tabs` component to organize these sections.
     - **Booking History:** Shows "You haven't made any bookings yet." and a "Find an Artisan" button (non-functional).
     - **My Reviews:** Shows "You haven't written any reviews yet."
     - **Favorites:** Shows "You haven't saved any artisans yet." and a "Browse Artisans" button (non-functional).
     - These are all static empty states. No data is fetched or displayed for these sections.
   - **Missing Features (as per Expected Behavior):**
     - **Authentication:** Critical user-specific page, but no actual authentication or fetching of real user data.
     - **Edit Profile Functionality:** The "Edit Profile" button does nothing. No form or mechanism to change user information and save it.
     - **Change Password:** No specific "Change Password" functionality (could be under "Security Settings" but that's also non-functional).
     - **Notification Preferences:** Button exists, but no functionality.
     - **Payment Methods:** Button exists, but no functionality.
     - **Delete Account:** No "Delete Account" option.
     - **Artisan Profile Toggle:** If `user.isArtisan` were true, there's no specific UI shown to manage an artisan profile distinct from the client profile view. The "Become an Artisan" button just disappears.
     - **Actual Data for Tabs:** Booking history, reviews, and favorites are just empty states.
   - **Malformed Data Handling (General):**
     - If the mock `user` object were missing fields, it would display `undefined` or empty strings.
     - Since most interactive elements are non-functional, error handling for operations like saving data is not applicable yet.
   - **Structure:** The page is well-structured with `Card` components for different sections and `Tabs` for user activity.

*(Further sections for other pages/components will be added later)*
