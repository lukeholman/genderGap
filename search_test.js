d3.json('data_no_list_no_dup_disc.json', function(data){


console.log(data);




// var t0 = performance.now();

// avail_counts = data.filter(function(d){
// 	return d.Discipline[0] == 'Chemistry';
// }).filter(function(d){
// 	return d.Journal == 'allJournals'
// }).map(function(d){return d.Country[0];})

// console.log(_.uniq(avail_counts));

// var t1 = performance.now();
// console.log("Call to map a disc search took " + (t1 - t0) + " milliseconds.");


// console.log(
// 		data.filter(function(d){
// 			return d.Journal[0] != 'allJournals';
// 		}).filter(function(d){
// 			return d.Discipline != 'allDisciplines';
// 		})

// 	)


// console.log(data.filter(function(d){
// 	return d.Discipline == 'allDisciplines';




var t0 = performance.now();


// Test of restructuring the data

	var disc = _.filter(data, function(o){
		return (o.Discipline != 'allDisciplines') & 
				(o.Journal == 'allJournals') & 
				(o.Position == 'Overall')
	});


	var disciplines = _.uniq(
						_.map(disc, function(o){return o.Discipline})
					);



	var new_dat_arr = [];


	for (var i = 0; i < disciplines.length; i++) {

		new_dat_arr[i] = _.set({}, 'Discipline', disciplines[i]);


		var countries = _.uniq(
					_.filter(disc, function(o){ return o.Discipline == disciplines[i]})
					.map(function(o){return o.Country})
				)
		
		for (var j = 0; j < countries.length; j++) {
			
			var path = [disciplines[i], countries[j]];

			var dat  = _.find(disc, function(o){
				return (o.Discipline == disciplines[i]) & (o.Country == countries[j]);
			})

			_.set(new_dat_arr[i], countries[j], {
				Curve: dat.Curve,
				Points: dat.Points,
				Journal: dat.Journal
			});


		};
	};




console.log(new_dat_arr
);



console.log(


	_.filter(new_dat_arr, function(o){
		return o.Discipline == 'AIDS';
		})[0]['allCountries']['Points']
	.filter(function(o){return o.Y == 2002})

)


// Curve test



function curv(c,r,t){
    return _.round(100 * Math.exp(0.5 * r * (t-2000)) / (2 * Math.exp(0.5 * r * (t-2000)) + c), 
    				1
				)
}

console.log(curv(2, 0.089, 2002))

yrs = _.range(2002, 2051, 0.5);

console.log(yrs)
console.log(_.map(yrs, function(y){return curv(2, 0.089, y)}))




// Interpolation front side??

var years = _.range(2002, 2030+1);


for (var i = 0; i < data.length; i++) {
	data[i]



    var p_years = _.map(data[i]['Points'], function(o){
    	return o['Y']
    });

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
                {Y: years[j], GR: curv(c, r, years[j]), intp: 1}
            )
        }
    }
};

console.log(data);

var t1 = performance.now();
console.log("Call to map a disc search took " + (t1 - t0) + " milliseconds.");







})