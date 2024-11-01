export interface IAllMessages {
    [locale: string]: IMessages;
}

export interface IMessages {
    navigation: {
        home: string;
        settings: string;
        account: string;
        genres: string;
        language: string;
        search: string;
    };
    no_selected_films: string;
    specify_list_name: string;
    share_with_friends: string;
    copied: string;
    select: string;
    delete: string;
    filters: {
        sort_by: string;
        sort_direction: string;
        include_adult: string;
        release_date_from: string;
        release_date_to: string;
        genre: string;
        submit: string;
        sort: {
            popularity: string;
            release_date: string;
            revenue: string;
            primary_release_date: string;
            original_title: string;
            vote_average: string;
            vote_count: string;
        };
        sort_direction_options: {
            asc: string;
            desc: string;
        };
    };
    singlePage: {
        duration: string;
        release_date: string;
        genres: string;
    };
    auth: {
        sign_in: string;
        sign_up: string;
        remember_me: string;
        auth_question: string;
        forgot_password: string;
    };
    profile: {
        profile: string;
        edit_profile: string;
        edit: string;
        add_profile_image: string;
        selected_films: string;
        open_selected_films: string;
        delete_account: string;
        log_out: string;
    };
}