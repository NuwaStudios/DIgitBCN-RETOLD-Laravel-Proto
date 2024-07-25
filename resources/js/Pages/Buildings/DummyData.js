const crafts = [
    {   
        summary: {
            language: 'English',
            name_english: "Traditional carpet weaving",
            name_local: "Țesut de covoare tradițional",
            local_language: "Romanian",
            category: "Pottery and ceramics",
            short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus ante id iaculis varius. Nulla facilisi. Praesent dui arcu, rhoncus a nunc vitae, placerat lobortis diam. Vestibulum hendrerit lorem ac neque posuere, eget ultrices eros porttitor. Nunc eu placerat libero. Phasellus id lorem risus. Vivamus aliquam egestas interdum. Donec sit amet turpis in velit finibus.",
            type: {
                is_traditional: false,
                is_historical: false,
                is_archeological: false,
                is_educational: false
            },
            historical_period: {
                start_date: 1453,
                is_start_date_bc: false,
                end_date: 1990,
                is_end_date_bc: false
            },
            historical_geography: "Pangea",
            modern_geography: "Spain",
            cover_image: "https://picsum.photos/1920/1080?random=2",
            video_documentation: "",
        },
        crafters: [
            {
                first_name: "John",
                middle_name: "William",
                last_name: "Doe",
                birth_year: 1975,
                email: "john_doe@mail.com",
                phone: 654111333,
                adress: "1234, 5th avenue, New York, USA",
                city: "New York",
                postal_code: "12345",
                country: "USA",
                nationality: "American",
                website: "www.johndoe.com",
                crafter_experience: {
                    from_year: 1995,
                    to_year: 2021,
                    is_to_current: false,
                },
                role: "Craftsman",
                is_main_occupation: true,
                is_crafter_practicing_other_crafts: true,
                crafter_motivation: "personal interest",
                does_crafter_have_colleagues: false,
                how_was_craft_learnt: {
                    is_from_person: false,
                    is_from_apprenticeship: false,
                    is_from_academic_course: true,
                },
                habitual_working_area: "rural workshop",
                does_crafter_model: false,
                does_crafter_teach: true
            },
            {
                first_name: "Sarah",
                middle_name: "",
                last_name: "Smith",
                birth_year: 1990,
                email: "sarah_smith@mail.com",
                phone: 692555132,
                adress: "33, Main Road, Florida, USA",
                city: "Orlando",
                postal_code: "12355",
                country: "USA",
                nationality: "American",
                website: "www.sarah.com",
                crafter_experience: {
                    from_year: 2009,
                    to_year: 2023,
                    is_to_current: false,
                },
                role: "Craftsman",
                is_main_occupation: true,
                is_crafter_practicing_other_crafts: true,
                crafter_motivation: "personal interest",
                does_crafter_have_colleagues: false,
                how_was_craft_learnt: {
                    is_from_person: false,
                    is_from_apprenticeship: false,
                    is_from_academic_course: true,
                },
                habitual_working_area: "rural workshop",
                does_crafter_model: false,
                does_crafter_teach: true
            }
        ],
        documenters:  {
            documentation_country: "Romania",
            documentation_ocasion: "Regular museum demonstration",
            institution_name_english: "National Museum of Romanian History",
            institution_name_local: "Museul National de Istorie din Romania",
            institution_name_legal: "Museul National de Istorie din Romania",
            website: "www.mnir.ro",
            adress: "Calea Victoriei 12",
            city: "Bucuresti",
            postal_code: "010071",
            country: "Romania",
            documentation_responsible: {
                first_name: "John",
                middle_name: "William",
                last_name: "Doe",
            },
            documentation_date: {
                start_date: "2021-09-01",
                end_date: "2021-09-30",
            },
        },
        final_product: {
            product_name_english: "Traditional carpet",
            product_name_local: "Covor tradițional",
            product_description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus ante id iaculis varius. Nulla facilisi. Praesent dui arcu, rhoncus a nunc vitae, placerat lobortis diam. Vestibulum hendrerit lorem ac neque posuere, eget ultrices eros porttitor. Nunc eu placerat libero. Phasellus id lorem risus. Vivamus aliquam egestas interdum. Donec sit amet turpis in velit finibus.",
            product_image: "https://picsum.photos/1920/1080?random=3",
            product_purposes: {
                practical_use: true,
                decorative_use: true,
                experimental_purposes: false,
                educational_purposes: false
            },
            product_durability: "High",
            product_distribution: "Local",
            product_reachability: "Market"
        }
        
    }
]

export default crafts;