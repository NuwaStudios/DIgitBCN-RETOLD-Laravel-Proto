<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 2000 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
-------------------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------------------
Notes for NUWA/EXARC
-----------------------------------
Access users by default:

      'name' => 'manager',
      'email' => 'manager@test.org',
      'password' => '12345678',
      'role' => 'manager',
      'e74_organisation_id' => 1
      
      'name' => 'manager2',
      'email' => 'manager2@test.org',
      'password' => '12345678',
      'role' => 'manager',
      'e74_organisation_id' => 2

      'name' => 'admin',
      'email' => 'admin@test.org',
      'password' => '12345678',
      'role' => 'admin
      
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
