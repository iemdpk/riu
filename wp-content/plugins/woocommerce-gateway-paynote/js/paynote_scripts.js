jQuery(window).on('load', function() {

    var btn = jQuery("input[value='Search orders']").parent();
    jQuery('<div style="display: flex;flex-direction: row-reverse;margin: 5px 0;"><button id="paynote_status_update_all" class="button wc-action-button wc-action-button-view view" href="#" aria-label="Status Update">Update Paynote Statuses</button><hr class="wp-header-end"></div>').insertBefore(btn);

    jQuery('button#paynote_status_update_all').click(function() {
        var btn = jQuery(this);
        jQuery.ajax(ajaxurl, {
            type: "post",
            data: {
                action: 'paynote_status_update_all_hook',
                _ajax_nonce: ajax_object_name.security
            },
            beforeSend: function() {
                btn.append('<div id="loading" style="display:inline;margin:3px"><img src="images/loading.gif" title="loading" /></div>');
                btn.prop('disabled', true);
            },
            success: function(response) {
                location.reload();
            },
            complete: function() {
                btn.find('#loading').remove();
                btn.prop('disabled', false);
            },
            error: function(err) {
                console.log("Inside error and the error is: " + err.status + " " + err.statusText);
            }
        });
    });
});

    
(function(d,s){var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src=
    'https://cdn.plaid.com/link/v2/stable/link-initialize.js';f.parentNode.insertBefore(j,f);
    console.log('load plaid');
    })(document,'script');
