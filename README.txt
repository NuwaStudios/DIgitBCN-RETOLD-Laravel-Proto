Notes for NUWA/EXARC
-----------------------------------

Features on the application:

- Dashboard
	- One dashboard for each role on the application (documenter, manager, super admin)
	- Counters for the dashboard cards are dummy data
	
[ PAGES SECTION ] -> accessible for documenter, manager, super admin
- Buildings and crafts
	- Listing view
		- Has filters by some fields on DOCUMENT object (document is the wrapper object for building/crafts, where ID, title, country, is_public is setted)
		- Every card has an edit button (edit view) and a view button (Detail view)
	- Detail view
		- Access through Listing view, or via URL (if user knows the document ID for that building/craft, <domain>/<crafts|buildings>/<id>/edit
		- In case of buildings, it contains the 3D model (if uploaded)
		- Has static information about the desired building/craft
	- Create building | craft
		- Access through the menu (Add new... option)
		- Is the form where a building or a craft is created
		- Publishing the form makes it public immediately
		- Saving creates the form but is not public immediately
		- User does not lose information on the device as every time the user types on the form, localStorage gets modified, so if user switches views, the form still gets complimented
		- Clear button clears the cache and the whole form
		
[ MANAGEMENT SECTION ] -> accessible for manager, super admin
- Crafters
	- Listing view
		- crafters detail view, press on the name on the card
	- Detail view
	- Create view
		- There is no edit functionality for crafters
- Pending for approval
	- View where a manager/superadmin will receive forms that are not published, and can either approve them or soft delete them (soft delete will leave the data in the database but will never be shown to any user)

[ ADMINISTRATOR SECTION ] -> accessible for super admin
- Institutions
	- Not implemented
- Organisations
	- Listing view
	- Detail view
		- In the users tab, you can decide to add or remove users to an organisation
	- Create view
		- Can add an institution to an organisation, though institutions functionality as a whole is not yet implemented
- Users
	- Listing view
		- Admin can quick manage users in the application
		- Directly from the dynamic table, super admin can change an user's role, and disable or enable an user on the platform (only enabled users should be allowed to enter the app via log in)
[ MISC ] -> accessible for documenter, manager, super admin

- Support
	- Not implemented yet (notifications system could be fitting here)

INCOMPLETE/YET TO BE IMPLEMENTED FEATURES/ TO BE FIXED (that were not on the planning):

- 3D Model
	- There is no mark system to document over the 3D model
	- At the moment, only 3D models should be uploaded if anything should be added in the building form.
- Form validation
	- Forms have no accurate validation about required fields, or data input
- Dashboard counters
- Whole institutions functionality
- Visibility in all areas by role might not be 100% accurate
	- Restricting data in index views per organisation is pending
- add new user view not working
- User profile editing is not working
- Public API endpoints (and securing them/granting access to them)
- Crafters form needs to be rethought as some fields are related to a crafter and a specific craft, these fields are not fitting to the existing database right now.
- Better user profile configuration
- Images handling for cards (dummy images or no images at all for listing views data right now, either dashboard)
- Images added on the forms + 3d model are stored in the root directory of the application itself, should be stored in an external server at some point.






