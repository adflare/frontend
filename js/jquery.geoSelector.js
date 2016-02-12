(function( $ ){

    $.fn.geoSelector = function(options, values) {

        function fx() {
            return options;
        }
        var ret = null;
        var defaults = {
            regionID: -1,
            minInputChar: 1,
            bindEvent: "keyup"
        };
        defaults.events = {
            onGsData: function() {},
            onGsError: function() {},
            onGsCityData: function(){},
            onGsCityStart: function() {}
        };
        var settings = $.extend( {}, defaults, options );

        this.each(function() {
            function jqgApi(type, data) {
                if (type = 'region') {
                    $.ajax({
                        url: 'http://evildevel.com/Test/Region',
                        data: data,
                        error: function (jqXHR, textStatus, errorThrown) {
                            if (typeof(settings.events.onGsError) != "undefined") {
                                settings.events.onGsError.call(this, textStatus);
                            }
                        }
                    }).done(function (data) {
                        if (typeof(settings.events.onGsData) != "undefined") {
                            settings.events.onGsData.call(this, data);
                        }
                        $.each(data, function (index, value) {
                            $('#jqg-rgs').append('<br><a href="#" class="jqg-rg" data-index="' + value[1] + '" onclick="$(this).parent().parent().geoSelector(' + value[0] + ')">' + value[1] + '</a>');
                        });
                    })
                }
                if (type = 'city') {
                    $.ajax({
                        url: 'http://evildevel.com/Test/City',
                        data: data,
                        error: function (jqXHR, textStatus, errorThrown) {
                            if (typeof(settings.events.onGsError) != "undefined") {
                                settings.events.onGsError.call(this, textStatus);
                            }
                        },
                        beforeSend: function (options) {
                            if (typeof(settings.events.onGsCityStart) != "undefined") {
                                settings.events.onGsCityStart.call(this, options);
                            }
                        }
                    }).done(function (data) {
                        if (typeof(settings.events.onGsCityData) != "undefined") {
                            settings.events.onGsCityData.call(this, data);
                        }
                        $.each(data, function (index, value) {
                            $('#jqg-cities').append('<p class="jqg-city">' + value[1] + '</p>');
                        });
                    })
                }
            }
            $(this).html('<input type="text" id="jqg-region"><div id="jqg-rgs"></div><div id="jqg-cities"></div>');
            $('#jqg-region').keyup(function () {
                var cr = $('#jqg-region').val();
                $('#jqg-rgs').show();
                if (cr.length === 0) {$('#jqg-rgs').empty()}
                if (cr.length === settings.minInputChar || cr.length === settings.minInputChar + 2 || cr.length === settings.minInputChar + 4) {
                    $('#jqg-rgs').empty();
                    jqgApi('region', {'name': cr});
                }
            });
            var fxx = fx();
            if (typeof(fxx) == "number") {
                $('#jqg-region').val(fxx);
                $('#jqg-rgs').hide();
                jqgApi('city', {'region': fxx});
                $('#jqg-region').keyup(function () {
                    var cr = $('#jqg-region').val();
                    if (cr.length === 0) {$('#jqg-rgs').empty()}
                    if (cr.length === settings.minInputChar || cr.length === settings.minInputChar + 2 || cr.length === settings.minInputChar + 4) {
                        $('#jqg-rgs').show();
                        $('#jqg-rgs').empty();
                        jqgApi('region', {'name': cr});
                    }
                });
            }
        });
        if (values != 'undefined') {
            if(options == 'get') {

                if(values == 'regionID') {ret = settings.regionID}
                if(values == 'minInputChar') {ret = settings.minInputChar}
                if(values == 'bindEvent') {ret = settings.bindEvent}
            }
        }
        if (!ret) {
            ret = this;
        }

        return ret;
    }
})( jQuery );