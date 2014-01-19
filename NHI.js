/*----------------------------------------------------------------------------
Author:             Jonathan Murray

JavaScript File:    NHI.js

Description:        This is the New Zealand Health NHI validation routine

Notes:              This validation routine will suceed on test NHI's:
                    ZZZ9999, ABC1234 and ABC1235
----------------------------------------------------------------------------*/

helpers.validateNHI = function(nhi) {
"use strict";
    
    var this_nhi = nhi;
    var bln_valid_nhi = true;
    var char_1_num, char_2_num, char_3_num;

    if (this_nhi === null || !this_nhi || this_nhi === '' || this_nhi === ' ' || typeof this_nhi !== 'string' || this_nhi.length !== 7) {
        return false;
    }
    else {
        this_nhi = this_nhi.toUpperCase();
    }

    if (this_nhi !== 'ZZZ9999' && this_nhi !== 'ABC1234' && this_nhi !== 'ABC1235') {
        if (this_nhi.length === 7) {
            var valid_chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
            for (var i = 0; i < 3; i++) {
                if (valid_chars.indexOf(this_nhi.charAt(i)) < 0) {
                    bln_valid_nhi = false;
                } else {
                    for (var c = 0; c < valid_chars.length + 1; c++) {
                        if (this_nhi.charAt(i) === valid_chars.charAt(c)) {
                            if (i === 0) {
                                char_1_num = c + 1;
                            } else if (i === 1) {
                                char_2_num = c + 1;
                            } else if (i === 2) {
                                char_3_num = c + 1;
                            }
                        }
                    }
                }
            }

            if (bln_valid_nhi) {
                if (isNaN(this_nhi.substr(3, 9))) {
                    bln_valid_nhi = false;
                }
            }

            var my_checksum = ((char_1_num * 7) + (char_2_num * 6) + (char_3_num * 5) + (parseInt(this_nhi.charAt(3),10) * 4) + (parseInt(this_nhi.charAt(4),10) * 3) + (parseInt(this_nhi.charAt(5),10) * 2)) % 11;

            if (my_checksum !== 0) {
                var my_check_digit = 11 - my_checksum;
                if (my_check_digit === 10) {
                    my_checksum = 0;
                } else {
                    my_checksum = my_check_digit;
                }
            }

            if (my_checksum !== parseInt(this_nhi.charAt(6),10)) {
                bln_valid_nhi = false;
            }

        } else {
            bln_valid_nhi = false;
        }
    }

    return bln_valid_nhi;
};