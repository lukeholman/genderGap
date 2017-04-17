

function initButtFiltLoc(){
    
    // make button active at init
    d3.selectAll('.controls_by_cat_container .disp_butt')
        .classed('active_butt', false)
        .filter(function(){
            return d3.select(this).attr('value') == dispMode;
        })
        .classed('active_butt', true)


    d3.selectAll('.search').remove(); 
    d3.selectAll('.filter_one').remove();
    d3.selectAll('.filter_two').remove();


    d3.select('.filt_reset_butt_one').remove()
    d3.select('.filt_reset_butt_two').remove()
    d3.select('.search_reset_butt').remove()

    d3.selectAll('.disc_filt').remove();
    d3.selectAll('.disc_butt_reset').remove();


    // init location of filters in right spots
    var filt_one_loc = d3.selectAll('.cont_cat')
        .filter(function(){
            return d3.select(this).classed(dispFiltKey[dispMode][0])
        })

    filt_one_loc
        .append('select').classed('filter_one', true)
        .append('option')

    filt_one_loc
        .append('div').classed('filt_reset_butt_one', true)
        .text('Reset')

    var filt_two_loc = d3.selectAll('.cont_cat')
        .filter(function(){
            return d3.select(this).classed(dispFiltKey[dispMode][1])
        })

    filt_two_loc
        .append('select').classed('filter_two', true)
        .append('option')

    filt_two_loc
        .append('div').classed('filt_reset_butt_two', true)
        .text('Reset')


    var search_loc = d3.selectAll('.cont_cat')
        .filter(function(){
            return d3.select(this).classed(getDispDat())
        })

    search_loc
        .append('select').classed('search', true)
        .append('option')

    search_loc
        .append('div').classed('search_reset_butt', true)
        .text('Clear Selections')


    // if dispmode is Journal ... set up Discipline filter

    if (dispMode == 'J') {
        var disc_loc = d3.select('.Discipline');

        disc_loc
            .append('select').classed('disc_filt', true)
            .append('option')

        disc_loc
            .append('div').classed('disc_butt_reset', true)
            .text('Reset')


    }


}



// Positioning functions

function legendPos(){
        // $('.legend')
        //     .css('position', 'fixed')
        //     .css('left', $('.line_plot_yrText_right').offset()['left']+10)
        //     .css('top', document.getElementById('perc_line_fifty').getBoundingClientRect()['top'] + 10)


        d3.select('.legend')
            .style('position', 'fixed')
            .style('left', d3.select('.line_plot_yrText_right').node().getBoundingClientRect()['left']+10)
            .style('top', d3.select('#perc_line_fifty').node().getBoundingClientRect()['top'] + 10)
    }

function yearSliderPos(){
        d3.select('#year_slider')
        .style('top', function(){
                var yr_txt_rect = d3.select('#year_text').node().getBoundingClientRect();
                return (yr_txt_rect['top'] + yr_txt_rect['height'] + 2+ window.scrollY) + 'px'
            })
        .style('left', function(){
                var yr_txt_rect = d3.select('#year_text').node().getBoundingClientRect();
                return (yr_txt_rect['left'] + window.scrollX) + 'px'
            })
        

}

function scatDispOptPos(){
    d3.select('#scat_disp_opts')
        .style('top', function(){
            var right_yr_txt = d3.select('.line_plot_yrText_right')
                                    .node().getBoundingClientRect();

            var this_height = this.getBoundingClientRect()['height'];

            return (right_yr_txt['top'] - this_height - 40 + window.scrollY) + 'px';
        })
        .style('left', function(){
            var right_yr_txt = d3.select('.line_plot_yrText_right')
                                    .node().getBoundingClientRect();

            return (right_yr_txt['left'] + 10 + window.scrollX) + 'px';

        })
}

function aboutPos(){
    d3.select('#about_cont')
        .style('top', function(){
            
        })
}

function rePositioningScrollResize(){
    legendPos();
    yearSliderPos();
    scatDispOptPos();

}




// Toggle Button functions

function toggleButt(state, ret_value){

    // blah blah blah

    if(state=='off'){

        if(ret_value == 'val') {
            return 'on';
        }
        else if (ret_value=='background'){
            return 'rgb(143, 188, 216)'
        }
    }
    else {
        if(ret_value == 'val') {
            return 'off';
        }
        else if (ret_value=='background') {
            return 'white' 
        }
    }
}







 
// data reanalysis

function dispDatGen(data, disp){
    if (disp=='J') {
        var dat = _.filter(data, function(o){
            return  (o.Country == 'allCountries') &
                    (o.Journal != 'allJournals') & 
                    (o.Position == 'Overall') &
                    (o.Discipline == 'Neurology') // just for demo, will need to filter by Disc       
            });
    };

    if (disp=='D') {
        var dat = _.filter(data, function(o){
            return (o.Discipline != 'allDisciplines') & 
                    (o.Country == 'allCountries') &
                    (o.Journal == 'allJournals') & 
                    (o.Position == 'Overall')       
        })
    };

    if (disp=='C') {
        var dat = _.filter(data, function(o){
            return  (o.Discipline) == 'allDisciplines' &
                    (o.Country != 'allCountries') &
                    (o.Position == 'Overall')       
        });
    };

    if (disp=='P') {
        var dat = _.filter(data, function(o){
            return  (o.Discipline) == 'allDisciplines' &
                    (o.Country == 'allCountries')   
        });
    };


    return dat;
}


function dispDatGenFilt(data, disp){
    if (disp=='J') {
        var dat = _.filter(data, function(o){
            return (o.Journal != 'allJournals') 
            });
    };

    if (disp=='D') {
        var dat = _.filter(data, function(o){
            return (o.Discipline != 'allDisciplines') & 
                    (o.Journal == 'allJournals')
        })
    };

    if (disp=='C') {
        var dat = _.filter(data, function(o){
            return   (o.Country != 'allCountries') &
                        (o.Journal == 'allJournals')     
        });
    };

    if (disp=='P') {
        var dat = _.filter(data, function(o){
            return  (o.Journal == 'allJournals')
                    // & (o.Position != 'Overall')  
        });
    };


    return dat;
}


function curv(c,r,t, dec){

    var val = _.round(100 * Math.exp(0.5 * r * (t-2000)) / (2 * Math.exp(0.5 * r * (t-2000)) + c),
                    dec
                )

    if (r<0 && c <0) {              // Handle the asymptotes that occasionally appear
        if (val>100) { val = 100;}
        else if (val<0) {val = 100;}
        }
        
    if (r>0 && c <0) {
        if (val>100) { val = 100;}
        else if (val<0) {val = 100;}
        }


    return val;
}



function ci_line_dat_gen(points){
    

    return _.map(points, function(p){
        return [
            {
                year: p['Y'],
                perc: p['lc']
            },

            {
                year: p['Y'],
                perc: p['uc']
            }
        ]
    })
}   



function line_dat_gen(curv_dat, yr_max){


    var yrs = _.range(2000, (yr_max+1), 1);

    var line_dat = _.map(yrs, function(y){
        return {year: y, perc: curv(curv_dat['c'], curv_dat['r'], y, 3)}
    })

    console.log('\n Line Dat')
    console.log(line_dat)

    return line_dat




}


function n_auth_gen(data) {

    for (var i = 0; i < data.length; i++) {
        for (j=0; j<data[i].Points.length; j++) {
            data[i].Points[j]['tot_auth'] = data[i].Points[j]['M'] + data[i].Points[j]['F'];
        }
    };

}



// Presumes data file is "data"
// Presumes lodash is loaded
function interpolate_years(data){

    // Adds interpolated data points to data
	
    var years = _.range(2002, 2030+1);


    for (var i = 0; i < data.length; i++) {
    	



        var p_years = _.map(data[i]['Points'], function(o){
        	return o['Y']
        });


        // mean sample n for interpolated data points
        var mean_n = _.mean(
                _.map(data[i]['Points'], function(p){
                    return p['tot_auth']; // 'tot_auth' generated by n_auth_gen
                    }
                )
            )

        data[i]['mean_n'] = mean_n;


        for (var j=0; j<years.length; j++) {


        	if (_.includes(p_years, years[j])) {

                // not interpolated
                _.filter(data[i]['Points'], function(o){
                	return o['Y'] == years[j]
                })[0]['intp'] = 0

    		}

            else {
                var r = data[i]['Curve']['r']
                var c = data[i]['Curve']['c']

                data[i]['Points'].push(
                    {Y: years[j], GR: curv(c, r, years[j], 1), intp: 1}
                )
            }
        }
    };
};


function nestDatGen(data){
    dat = dispDatGenFilt(data, dispMode)

    if (dispMode == 'J') {
        var journDiscIdx = d3.nest()
            .key(function(d) {return d.Journal})
            .key(function(d) {return d.Discipline})
            .map(dat);

    }

    var nestDatInit = d3.nest()
                    .key(function(d) { return d[dispDatKey[dispMode]]})
                    .key(function(d) { return d[dispFiltKey[dispMode][0]]})
                    .key(function(d) { return d[dispFiltKey[dispMode][1]]})
                    // .rollup(function(d){
                    //  return {
                    //      Points: d.Points,
                    //      Curve: d.Curve,
                    //      mean_n: d.mean_n
                    //  }
                    // })
                    .object(dat)


    // Avoid key, value structure at top
    var nestDat = d3.keys(nestDatInit).map(function(d){ 
                    var ndat = {};
                    ndat['nDat'] = nestDatInit[d]; // nDat = nested data
                    ndat[dispDatKey[dispMode]] = d; // disp mode coded in as key id

                    if (dispMode=='J'){
                        ndat['Discipline'] = journDiscIdx.get(d).keys()[0];
                    }
                    return ndat;
        })

    return nestDat;


}





// function n_range(data) {
//     return d3.extent(
//         _.flatten(
//             _.map(data, function(d){
//                 return d3.extent(d['Points'], function(d){
//                             return d['n'];
//                         })
            
//                     }
//             )
//         )
//     )
// }


function n_range(data) {

    // var filtParam1 = filtParams[dispFiltKey[dispMode][0]]

    // var filtParam2 = filtParams[dispFiltKey[dispMode][1]]


    return d3.extent(
        _.flatten(_.map(data, function(d){
                    return _.map(
                                _.get(d, ['nDat', filtParam1, filtParam2, 0, 'Points'], undefined),
                                function(o){return o['tot_auth']}
                            )
                        })
                    )
            )

}



function n_range_proto(data) {
    // console.log('inner n_range_proto')
    // console.log(filtParam1)
    // console.log(filtParam2)
    // console.log(data)

            return d3.extent(
            _.flatten(
            _.map(data, function(dob){
            return _.map(
                _.get(dob, ['nDat', filtParam1, filtParam2, 0, 'Points'], undefined),
                function(o){return o['n']}
                )
            }
            )
            )
            )
        }



function pnt_by_yr(dat, year, att){
    return _.filter(
        dat['Points'], 
        function(p){return p['Y'] == year;}
        )[0][att];

}


function getPntDat(dat, year, att){

    // filt conditional on dispMode

    // var filtParam1 = filtParams[dispFiltKey[dispMode][0]]

    // var filtParam2 = filtParams[dispFiltKey[dispMode][1]]

    // pnt_by_yr(_.get(dat, ['nDat', filtParam1, filtParam2, 0], undefined), year, att)
    
    return _.filter(
                _.get(dat, ['nDat', filtParam1, filtParam2, 0, 'Points'], undefined),
                    function(o){return o['Y'] == year} 
            )[0][att]

    // Use below 
    // How deal with undefined for data points ... if statement and fade in .attr()?

    // _.get(d, ['nDat', filtParam1, filtParam2, 0], undefined)    


}

function tt_fill(d, tooltip){

    tooltip.style('visibility', 'visible');
    tooltip.append('p').classed('tt_main', true)
            .text(d[getDispDat()]);
    tooltip.append('p').classed('tt_perc', true)
            .text((getPntDat(d, year, 'GR'))+'\% Female');


    if (getPntDat(d, year, 'intp') == 0) {

        tooltip.append('p').classed('tt_n', true)
            .text(d3.format(',')(getPntDat(d, year, 'n')) +' Papers');
        tooltip.append('p').classed('tt_nf', true)
            .text(d3.format(',')(getPntDat(d, year, 'F')) + ' Female')
            .style('color', col_scale(85));
        tooltip.append('p').classed('tt_nm', true)
            .text(d3.format(',')(getPntDat(d, year, 'M')) + ' Male')
            .style('color', col_scale(15));


    } else{
        tooltip.append('p').classed('tt_int', true)
            .text('Interpolated')
    };



}


function getDispDat() {
    return dispDatKey[dispMode];

}

function hasDat(dat) {

    return _.has(dat, ['nDat', filtParam1, filtParam2])
}


function uniqColsGen(uniq_hue){
    var uniq_cols = {           // H, Sat, Light
        line: hsluv.hsluvToHex([uniq_hue, col_params.line.sat, col_params.line.light]),
        border: hsluv.hsluvToHex([uniq_hue, col_params.border.sat, col_params.border.light]),
        null_fill: hsluv.hsluvToHex([uniq_hue, col_params.null_fill.sat, col_params.null_fill.light])
    };

    return uniq_cols;
}


// function getDatActive(dat){

//     return _.filter(dat, function(o){
//         return _.has(o, ['nDat', filtParam1, filtParam2])
//     });

//     // return _.filter(dat, function(o){
//     //     return _.has(o, ['nDat', 'Japan', filtParam2])
//     // });


// }

//////
// FOr filtering
//////


function sort_opts_low_case(opts){

    opts.sort(function(a, b){
        var nameA=a.toLowerCase(), nameB=b.toLowerCase();
        if (nameA < nameB) //sort string ascending
            return -1;
        if (nameA > nameB)
            return 1;
        return 0; //default return value (no sorting)
    });

    return opts;

}



function getJournDiscSelectDat(dat){
    return _.filter(dat, function(d){
        return d['Discipline'] == disc;
    })
}


function checkInActive(current, active){

    // if in active
    if (_.findIndex(active, function(ac){
        return ac == current; // current count not in active
            })==-1) {
        return true; // ie, current not active, so true for disabled
    }
    else {
        return false;
    }           

}

function checkSelected(current, filt){
    if (current == filtParams[filt]){
        return true;
    }
    else {
        return false;
    }
}

function checkSelectedJournDisc(current){
    if (current == disc){ // disc here is the global variable for the selected discipline in Journal mode
        return true;
    }
    else {
        return false;
    }
}


function getDatActive(dat, f1, f2){

    // Return data points that have data for current set of filters

    return _.filter(dat, function(o){
        return _.has(o, ['nDat', f1, f2])
    });

    // return _.filter(dat, function(o){
    //     return _.has(o, ['nDat', 'Japan', filtParam2])
    // });


}

function getActiveFiltOneOpts(dat, all_uniq){

    // return filt one options that provide data given current filt two

    return _.filter(all_uniq, function(au){
                var optDat = getDatActive(dat, au, filtParam2);
                return optDat.length > 0;
            })

}

function getActiveFiltTwoOpts(dat, all_uniq){

    // return filt two options that provide data given current filt one

    return _.filter(all_uniq, function(au){
                var optDat = getDatActive(dat, filtParam1, au);
                return optDat.length > 0;
            })

}


function getFiltOneOpts(dat){

    // Get all unique current filt one opts given current filts

    return _.uniq(
                _.flatten(
                        _.map(getDatActive(dat, filtParam1, filtParam2), function(o){
                            return _.keys(o['nDat'])
                            })
                        )
                )
            
}


function getFiltTwoOpts(dat){

    // Get all unique current filt two opts given current filts


    return _.uniq(
                _.flattenDeep(
                        _.map(getDatActive(dat, filtParam1, filtParam2), function(o){

                            return _.map(_.keys(o['nDat']), function(k){
                                return _.keys(o['nDat'][k]);
                                    })

                            })
                        )
                )

}





function getJournDiscOpts(dat){
    // For when DispMode is Journal

    return _.uniq(
                _.map(
                    getDatActive(dat, filtParam1, filtParam2), 
                    function(d){
                        return d['Discipline'];
                    }

                )
            )
}


function getActiveJournDiscOpts(dat, all_uniq){
    // for when dispmode is Journal

    return _.filter(all_uniq, function(au){
                var optDat = getDatActive(dat, filtParam1, filtParam2);
                return optDat.length > 0;
            })


}



function getDispOpts(dat){

    // Get all unique current display options given current filts

    return _.uniq(
                _.map(
                    getDatActive(dat, filtParam1, filtParam2), 
                    function(d){
                        return d[dispDatKey[dispMode]];
                    }

            )
        )
}



