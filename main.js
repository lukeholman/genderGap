

//
// !! Some of the interpolated GR data is out of range? (beyond 100%)

// Journals ... why no filt update without freezing?

// sizing of plot on different screens?

// scat plot
	// add CI option
	// add circ rad option



// Re-normalise radius scale on filter - done (simply call n_range(), which is filt dependent)
	// Need radius legend too ... otherwise confusing what's going on.


// Click to see deeper data (??)


// Disp filters
	// currently presume that for general filt settings, all dispopts will be available
	// may not be true for  dataset - may need to have an all and an active function like for filts






// Menu TIME

var body = d3.select('body');

var main = d3.select('.top_main')

var header = d3.select('.header')

var menu = d3.select('.menu')

var toggle = 'out'


menu.style('top', function(){
	return header.style('height')
})

d3.select('.top_dummy').style('height', function(){
	return (parseInt(header.style('height')) + parseInt(menu.style('height')))
})



d3.select('#header_about')
	.on('click', function(){

		var this_butt = d3.select(this);

		if (this_butt.attr('value')=='closed') {
			d3.select('.about_cont')
				.style('visibility', 'visible')
				.style('top', function(){
					return (parseInt(header.style('height')))+'px';
				})

			this_butt
				.attr('value', 'open')
				.text('close');
		}

		else {
			d3.select('.about_cont')
				.style('visibility', 'hidden')

			this_butt
				.attr('value', 'closed')
				.text('about')
		}

	})
	.on('mouseover', function(){
		d3.select(this)
			.style('color', 'rgb(145, 196, 221)')
			.style('border-left-color', 'rgb(145, 196, 221)')
	})
	.on('mouseout', function(){
		d3.select(this)
			.style('color', '')
			.style('border-left-color', '')
	})



var arrow_container = menu.append('div')
	.style('margin-top', 10)
	.append('svg')
	.attr('id', 'arrow_cont')
	// .attr('top', 1*rem)
	.attr('width','100%')
	.style('height', '2rem')
	.attr('viewBox','0 0 100 100')



var arrow = arrow_container.append('path')
	.attr('d',"M0,80 30,40 60,80")
	.attr('stroke','gray')
	.attr('stroke-width',10)
	.attr('fill','transparent')
	.attr('id', 'arrow')
	.attr('stroke-linecap','round')
	.attr('stroke-linejoin','round')

var toggle = 'out'

arrow_container.on('click', function(){

	if (toggle=='out')
		{ 
			menu.transition()
			.duration(500).ease(d3.easeBackInOut)
			.style('top', function(){
				return (this.getBoundingClientRect()['top'] - this.getBoundingClientRect()['height'] + d3.select('#arrow_cont').node().getBoundingClientRect()['height'] + window.scrollY)+'px'
			});

			arrow
				.transition().duration(500)
				.ease(d3.easeBackInOut)
				.attr('d', "M0,40 30,80 60,40")
			// animin.beginElement(); 			
			toggle = 'in';
		}
	else
		{ 
			menu
			.transition().duration(500).ease(d3.easeBackInOut)
			.style('top', function(){
				return (parseInt(header.style('height')) + window.scrollY)+'px'
			});
			
			arrow
				.transition().duration(500)
				.ease(d3.easeBackInOut)
				.attr('d', "M0,80 30,40 60,80")


			// animout.beginElement(); 			
			toggle = 'out';
		}
})




var bckg = d3.select('#background');

// Beeswarm set up

var bee_swarm = d3.select("#plot"),
    margin = {top: 40, right: 40, bottom: 40, left: 40},
    width = bee_swarm.attr("width") - margin.left - margin.right,
    height = bee_swarm.attr("height") - margin.top - margin.bottom;



var g_bee_swarm = bee_swarm.append("g")
    .attr("transform", 
    	"translate(" + margin.left + "," + margin.top + ")");



// Line set up
var line = d3.select('#line_plot'),
	margin_line = {top:40, right:140, bottom:40, left:140},
	width_line = line.attr('width') - margin_line.left-margin_line.right,
	height_line = line.attr('height') - margin_line.top - margin_line.bottom;

// To move line svg element across as needed
line.attr('x', width)

var g_line = line.append('g')
		.attr('transform',
			'translate('+margin_line.left+','+margin_line.top+')');






// For axis tick text percentage
var formatValue = d3.format(",d");

var perc_scale = d3.scaleLinear()
    				.rangeRound([0, height]);
 	perc_scale.domain([100, 0])

var col_scale = d3.scaleSequential(d3.interpolateRdYlBu)
					.domain([100, 0]);


// TO use a single hue sequential col scale

// function col_scale(v){
// 	var cs = d3.scaleSequential(d3.interpolateGnBu)
// 					.domain([0, 50])
// 	return cs(Math.abs(v-50))

// }

var radius = d3.scaleSqrt();


// For curve plotting.  Max year to which it goes

var year = 2016;

d3.select('#year_slider').attr('value', year);

var yr_max = 2045,
	yr_min = 2000;

var line_yr_scale = d3.scaleLinear()
						.range([0, width_line])
						.domain([yr_min, yr_max]); // may make flexible later




// Line plot Year Text elements

line.append('text')
	.classed('line_plot_yrText_left', true)
	.text(''+yr_min)
	.attr('y', perc_scale(50))
	.attr('x', margin_line.left)
	.attr("font-family", "sans-serif")
	.attr("font-size", "20px")
	.attr('dy', '0em')
	.attr('font-weight', 900)
	.attr("fill", "#A3A0A6")
	// .attr('stroke', '#A3A0A6')
	.attr('text-anchor', 'end');

line.append('text')
	.classed('line_plot_yrText_right', true)
	.text(''+yr_max)
	.attr('y', perc_scale(50))
	.attr('x', width_line + margin_line.left)
	.attr('dy', '0em')
	.attr("font-family", "sans-serif")
	.attr("font-size", "20px")
	.attr('font-weight', 900)
	.attr("fill", "#A3A0A6")
	// .attr('stroke', '#A3A0A6')
	.attr('text-anchor', 'start');


// Background percentage lines

var g_bckg = bckg.insert('g', 'svg')
				.attr('transform',
					'translate(0,'+margin.top+')');

g_bckg.insert('rect', 'svg')
	.attr('height', (perc_scale(37.5)-perc_scale(62.5)))
	.attr('width', bckg.attr('width'))
	.attr('y', perc_scale(62.5))
	.attr('fill', '#F6F4F8')

g_bckg.insert("line", 'svg')
	.classed('perc_line_fifty', true)
	.attr('id', 'perc_line_fifty')
	.attr("x1", 0)
	.attr("y1", perc_scale(50))
	.attr("x2", bckg.attr('width'))
	.attr("y2", perc_scale(50))
	.attr("stroke-width", 1.5)
	.attr("stroke", "#A3A0A6");



g_bckg.insert("line", 'svg')
	.classed('perc_line_twenty_five', true)
	.attr("x1", 0)
	.attr("y1", perc_scale(25))
	.attr("x2", bckg.attr('width'))
	.attr("y2", perc_scale(25))
	.attr("stroke-width", 1)
	.attr("stroke", "#A3A0A6")
	.attr('d')

g_bckg.insert("line", 'svg')
	.classed('perc_line_seventy_five', true)
	.attr("x1", 0)
	.attr("y1", perc_scale(75))
	.attr("x2", bckg.attr('width'))
	.attr("y2", perc_scale(75))
	.attr("stroke-width", 1)
	.attr("stroke", "#A3A0A6");

g_bckg.insert('text', 'svg')
	.text('50:50')
	.attr('y', perc_scale(50))
	// .attr('x',)
	.attr('dy', '-0.5em')
	.attr("font-family", "sans-serif")
	.attr("font-size", "15px")
	// .attr('font-weight', 900)
	.attr("fill", "#A3A0A6")
	// .attr('stroke', '#A3A0A6')
	.attr('text-anchor', 'start');

g_bckg.insert('text', 'svg')
	.text('75% Men')
	.attr('y', perc_scale(25))
	// .attr('x',)
	.attr('dy', '-0.5em')
	.attr("font-family", "sans-serif")
	.attr("font-size", "15px")
	// .attr('font-weight', 900)
	.attr("fill", "#A3A0A6")
	// .attr('stroke', '#A3A0A6')
	.attr('text-anchor', 'start');

g_bckg.insert('text', 'svg')
	.text('75% Women')
	.attr('y', perc_scale(75))
	// .attr('x',)
	.attr('dy', '-0.5em')
	.attr("font-family", "sans-serif")
	.attr("font-size", "15px")
	// .attr('font-weight', 900)
	.attr("fill", "#A3A0A6")
	// .attr('stroke', '#A3A0A6')
	.attr('text-anchor', 'start');	


var year_text = bckg.insert('text', 'svg')
	.attr('id', 'year_text')
	.text(''+year)
	.attr('y', perc_scale(95))
	// .attr('x',)
	.attr('dy', '+1em')
	.attr("font-family", "sans-serif")
	.attr("font-size", "35px")
	.attr('font-weight', 700)
	.attr("fill", "#A3A0A6")
	// .attr('stroke', '#A3A0A6')
	.attr('text-anchor', 'start');


d3.select('#year_slider')
	.style('position', 'absolute')
	.style('width', '8rem')
	.style('left', function(){
		return d3.select('#year_text').node().getBoundingClientRect()['left'] + 'px'
	})


// Positioning the legend div to be absolute 


rePositioningScrollResize();
window.onresize = rePositioningScrollResize;
window.onscroll = rePositioningScrollResize;








// Scat Plot Unique Colours

var border_plot_col_angles = [
0.0, 30, 124, 258, 280, 310 
];

var col_params = {
	line: {
		sat: 90,
		light: 50
	},
	border: {
		sat: 90, 
		light: 40

	},
	null_fill: {
		sat: 20,
		light: 90
	}
}

var border_plot_col_count = 0;



var dispDatKey = {
	D: 'Discipline',
	J: 'Journal',
	C: 'Country',
	P: 'Position'
};

var dispFiltKey = {
	D: ['Country', 'Position'],
	J: ['Country', 'Position', 'Discipline'],
	C: ['Position', 'Discipline'],
	P: ['Country', 'Discipline']

}


// Initial disp Mode and filter values defined here

var default_filtParams = {
	Discipline:'allDisciplines',
	Country: 'allCountries',
	Position: 'Overall'
}

var default_dispMode = 'D';

var default_disc = 'Multidisciplinary';

var disc = _.clone(default_disc);



var filtParams = _.cloneDeep(default_filtParams);

// Initial display mode defined here
var dispMode = _.clone(default_dispMode);



var dispOpts = ['J', 'D', 'C', 'P']; // redundant? - no, order for the disp mode buttons

var filtParam1 = filtParams[dispFiltKey[dispMode][0]]

var filtParam2 = filtParams[dispFiltKey[dispMode][1]]






// ASYNC Data Function


d3.json('data_no_list_no_dup_disc.json', function(main_data){


	d3.select('.loader_cont')
		.style('display', 'none');

	// $('.controls_by_cat_container .disp_butt').on('click', function(){
	// 	console.log('\n jquery j listiner')
	// 	if ($(this).attr('value')=='J') {
	// 		console.log('wait??')
	// 		$('*').css('cursor', 'wait')
	// 	}
	// })
		
	d3.selectAll('.controls_by_cat_container .disp_butt')
		.style('cursor', 'pointer')
		.on('click', function(){


			g_bee_swarm.selectAll('*').remove();
			g_line.selectAll('*').remove();
			d3.selectAll('.legend_item').remove();

			// d3.selectAll('.controls_by_cat_container .disp_butt')

			dispMode = d3.select(this).attr('value');

			if(dispMode=='J'){
				d3.select('.loader_cont')
					.style('display', '');

			}

			setTimeout(function(){ // so that loader has time to 'paint'

				// reset filt params to defaults
				filtParams = _.cloneDeep(default_filtParams);

				disc = _.clone(default_disc);


				filtParam1 = filtParams[dispFiltKey[dispMode][0]]

				filtParam2 = filtParams[dispFiltKey[dispMode][1]]


				dat = nestDatGen(main_data);
				dat_length = dat.length;

				// Filter the data for specific discipline ... else its too large
				if (dispMode == 'J') {
					journ_unfilt_dat = _.cloneDeep(dat)
					dat = getJournDiscSelectDat(journ_unfilt_dat)
					dat_length = dat.length;
				}

				console.log('\ndispMode from disp mode change')
				console.log(dispMode)

				console.log('\n dat')
				console.log(dat)

				// for when a discipline filter was built for journal mode
				if(d3.select('.Journal .select2').size() > 0) {
					$('.disc_filt').select2('destroy').empty().off()
				}			

				// Empty for when change disp mode and remove event listeners so no double up
				$('.search').select2('destroy').empty().off()
				$('.filter_one').select2('destroy').empty().off()								
				$('.filter_two').select2('destroy').empty().off()


				initButtFiltLoc();


				initFilters()

				disp()

				d3.select('.loader_cont')
					.style('display', 'none');



			}, 100) // end setTimeout()


		});


	console.log('main data')
	console.log(main_data)
	interpolate_years(main_data)
	// console.log(main_data)







	// var dat = dispDatGen(main_data, dispMode);
	// var dat_length = dat.length;

	dat = nestDatGen(main_data)
	dat_length = dat.length;

	console.log('disp data')
	console.log(dat);

	initButtFiltLoc();


	// INIT filts

	// calculate for all and call based on disp mode - make all function and auto filt function
	function initFilters(){

		// Initialised the contents of the filters

		all_uniq_disp_opts = getDispOpts(dat);

		all_uniq_filt_one = getFiltOneOpts(dat);
		all_uniq_filt_two = getFiltTwoOpts(dat);




		$('.search').select2({
			
			placeholder: 'Search for a ' + dispDatKey[dispMode],
			width: '100%',
			data: _.map(all_uniq_disp_opts, function(o){
				return {
					id: o,
					text: o
				}
			})
		})

		$('.search').val('').trigger('change')			






		$('.filter_one').select2({
			
			placeholder: 'Search ' + dispFiltKey[dispMode][0],
			width: '100%',
			data: _.map(all_uniq_filt_one, function(c){
				return {id: c,
						text: c,
						selected: checkSelected(c, dispFiltKey[dispMode][0])
						}
			})
		})


		$('.filter_two').select2({
			
			placeholder: 'Search ' + dispFiltKey[dispMode][1],
			width: '100%',
			data: _.map(all_uniq_filt_two, function(c){
				return {id: c,
						text: c,
						selected: checkSelected(c, dispFiltKey[dispMode][1])
						}
			})
		})


		if (dispMode == 'J') {
			all_uniq_disc_opts = getJournDiscOpts(journ_unfilt_dat);


			$('.disc_filt').select2({
				placeholder: 'Search Discipline',
				width: '100%',
				data: _.map(all_uniq_disc_opts, function(d){
					return {id: d,
							text: d,
							selected: checkSelectedJournDisc(d)
							}
				})

			})
		};



	}

	





	// For generating curve and CI lines

	var scat_line = d3.line().curve(d3.curveBasis)
	    .x(function(d) { return parseFloat(line_yr_scale(d['year'])); })
	    .y(function(d) { return parseFloat(perc_scale(d['perc'])); });

    var scat_ci_line = d3.line()
    	.x(function(d){return line_yr_scale(d['year'])})
    	.y(function(d){return perc_scale(d['perc'])})








	function tick(){

		// console.log(simulation.alpha());
		d3.selectAll('.pnt')
		// .filter(function(d){hasDat(d)})
			.attr('cx', function(d){return d.x})
			.attr('cy', function(d){return d.y})
	}





	// Tool TIp set up
	var tooltip = d3.select('body')
		.append('div')
		.classed('tooltip', true)
		.style('position', 'absolute')
		.style('visibility', 'hidden')
		.style('white-space', 'pre')
		.style('font-family', 'sans-serif');


	initFilters();
	disp();

	function disp(){ //in: dat, g_swarm, g_line; out: sim, pnt



		// State log
		console.log('dispMode fron disp()')
		console.log(dispMode)
		console.log('year')
		console.log(year)


		// Varibale radius scale to fit in data set


		radius.domain(n_range(dat));

		var abs_max_rad = 20;
		var abs_min_rad = 5;
		var n_dep_max_rad = 0.5* (width / (dat.length* 0.12));

		if (n_dep_max_rad > abs_max_rad){
			radius.range([abs_min_rad, abs_max_rad]);
		}

		else {
			radius.range([abs_min_rad, n_dep_max_rad])
		}



		reInitFilt();

		initScatOptsButt();

		// Simulation init
		// disp
		var simulation = d3.forceSimulation(dat)
			.force('x', d3.forceX(function(d){

					if (hasDat(d)) {
						return width/2;
					}
					else {
						return 0;
					}

				}).strength(0.07)
			)
			.force("y", d3.forceY(function(d){
					if (hasDat(d)) {

						return perc_scale(
							getPntDat(d, year, 'GR')
							)
						}

					else{
						return perc_scale(50) // Highest possible
					}
				}).strength(0.99)

			)
			.force("collide", 
				d3.forceCollide(function(d){
					if (hasDat(d)) {

						if(getPntDat(d, year, 'intp')==0){
							return radius(
								getPntDat(d, year, 'n')
									)
								}
						else {
							return radius(
								_.get(d, ['nDat',filtParam1, filtParam2, 0, 'mean_n'])
									)

							}
						}
					else {
						return 0;
						}

					}
				)
				)
			// .alphaTarget(0.2)
			.velocityDecay(0.45)
			.alphaDecay(0.011)
			.on('tick', tick);
			// .stop();


		// disp

		// pnt init
		var pnt = g_bee_swarm.selectAll('.pnt')
					.data(dat, function(d){return d[getDispDat()];})// dispDat

		// disp

		// pnt.filter(function(d){
		// 		return !_.has(d, ['nDat',filtParam1, filtParam2]) } )
		// 	.append('circle')
		// 	.classed('pnt', true)
		// 	.attr('r', 0)
		// 	.attr('cx', function(d){return d.x})
		// 	.attr('cy', function(d){return d.y})

		pnt.enter().append('circle').classed('pnt', true)
			.attr('value', 'not_clicked')
			.attr('r', function(d){
					if (hasDat(d)) {
						if(getPntDat(d, year, 'intp')==0){


							return radius(
								getPntDat(d, year, 'n')
									)
								}
						else {
							return radius(
								_.get(d, ['nDat',filtParam1, filtParam2, 0, 'mean_n'])
									)
							}
						}

					else {
						return 0;
					}
				})
			.attr('cx', function(d){return d.x})
			.attr('cy', function(d){return d.y})
			.style('stroke-dasharray', function(d){

				if(hasDat(d)) {
					if(getPntDat(d, year, 'intp')==1){
						return '3 1';
							}
				}

			})

			.style('fill', function(d){
				if (hasDat(d)) {
					return col_scale(getPntDat(d, year, 'GR'))
				}
			})
			.on('mouseover', function(d){

				//Tool-Tip

				d3.select(this).style('stroke-width', '3px');

				tt_fill(d, tooltip);

				if(d3.select(this).attr('value')=='clicked'){
					g_line.selectAll('.scat_plot')
						.filter(function(od){return od[getDispDat()]!=d[getDispDat()]}) //dispDat
						.style('opacity', '0.2');

					g_line.selectAll('.scat_plot')
						.filter(function(od){
							return od[getDispDat()] == d[getDispDat()]
						})
						.raise()

					d3.selectAll('.pnt')
						.style('opacity', '0.6');
					d3.select(this)
						.style('opacity', '');

					d3.selectAll('.legend_item')
						.style('opacity', 0.3);
					d3.selectAll('.legend_item')
						.filter(function(ld){
							return ld['id'] == d[getDispDat()];
							})
						.style('opacity', 1);


				}


			})
			.on('mousemove', function(){
		        tooltip
	                .style('top', (d3.event.pageY-150)+'px')
	                .style('left', (d3.event.pageX+5)+'px');

			})
			.on('mouseout', function(d){

				

				if (d3.select(this).attr('value') != 'clicked'){

					d3.select(this).style('stroke-width', '1px');

				}

				else {

					g_line.selectAll('.scat_plot')
						.style('opacity', '');

					d3.selectAll('.legend_item')
						.style('opacity', '');


					d3.selectAll('.pnt')
						.style('opacity', '');
				}

				tooltip.style('visibility', 'hidden');
				tooltip.selectAll('*').remove();
			})


// scat init
			.on('click', function(d){



				if (d3.select(this).attr('value')=='clicked') {


					d3.select(this).attr('value', 'not_clicked');
					d3.select(this)
						.style('stroke-width', '')
						.style('stroke', '');

					g_line.selectAll('.scat_plot')
						.filter(function(od){return od[getDispDat()]==d[getDispDat()]}) //dispDat
						.remove();

					g_line.selectAll('.scat_plot')
						.style('opacity', '');

					d3.selectAll('.pnt')
						.style('opacity', '');
					d3.selectAll('.legend_item')
						.style('opacity', '');


					d3.selectAll('.legend_item')
						.filter(function(){
							return d3.select(this).attr('value')==d[getDispDat()]
						})
						.remove();

					sortLegend();
					positionLegendItem();


					// May make sense, but if preious unclicked, then colors repeat
					// without the subtraction on un-click, more likely to get new color
					
					// border_plot_col_count -= 1


				} 

				else { //ie if not clicked

					var uniq_hue = border_plot_col_angles[(border_plot_col_count % border_plot_col_angles.length)];
					border_plot_col_count += 1;



					// var uniq_cols = {			// H, Sat, Light
					// 	line: hsluv.hsluvToHex([uniq_hue, col_params.line.sat, col_params.line.light]),
					// 	border: hsluv.hsluvToHex([uniq_hue, col_params.border.sat, col_params.border.light]),
					// 	null_fill: hsluv.hsluvToHex([uniq_hue, col_params.null_fill.sat, col_params.null_fill.light])
					// };


					var uniq_cols = uniqColsGen(uniq_hue)


					// mainly for the line plotting, but called here for legend ordering
					var line_dat = line_dat_gen(_.get(d, ['nDat',filtParam1, filtParam2, 0, 'Curve']), yr_max);



					var leg_item = d3.select('.legend')
						.append('div')
						.datum({
							id: d[getDispDat()]+'',
							ord_val: _.filter(line_dat, function(o){
								return o['year'] == yr_max;
							})[0]['perc']
						})
						.classed('legend_item', true)
						.attr('value', d[getDispDat()]+'')
						.attr('uniq_hue_dat', uniq_hue)									
						.style('opacity', 1e-6)
						.style('position', 'absolute')

					leg_item.append('svg').attr('height', '1em').attr('width', '1em')
						.append('circle')
							.attr('r', '25%')
							.attr('cx', '50%')
							.attr('cy', '50%')
							.attr('fill-opacity', 0)
							.attr('stroke', uniq_cols.border)
							.attr('stroke-width', 2);

					leg_item.append('div')
						.text(d[getDispDat()]+'')
						.style('color', uniq_cols.border)

					leg_item.transition('legend_init').duration(500)
						.style('opacity', 1)

					sortLegend();
					positionLegendItem();

					leg_item.on('mouseover', function(){

						// opacity of legend items
						d3.selectAll('.legend_item').style('opacity', 0.3);
						d3.select(this).style('opacity', 1);


						// scat

						g_line.selectAll('.scat_plot')
							.filter(function(od){return od[getDispDat()]!=d[getDispDat()]}) //dispDat
							.style('opacity', '0.2');

						g_line.selectAll('.scat_plot')
							.filter(function(od){
								return od[getDispDat()] == d[getDispDat()]
							})
							.raise()


						// pnt

						var swarmAtt = d[getDispDat()]+''

						d3.selectAll('.pnt').filter(function(p){
							return p[getDispDat()] != swarmAtt;
						}).style('fill', '#E1DFE3')
						.style('opacity', '0.6');



					})

					.on('mouseout', function(){

						d3.selectAll('.legend_item').style('opacity', '');


						g_line.selectAll('.scat_plot')
							.style('opacity', '');

						d3.selectAll('.pnt')
							.style('opacity', '');

						d3.selectAll('.pnt')
							.style('fill', function(d){
								if (hasDat(d)) {
									return col_scale(getPntDat(d, year, 'GR'))
									}
								})

					})
					.on('click', function(){

						d3.selectAll('.legend_item').style('opacity', '');

						var swarmAtt = d[getDispDat()]+''

						d3.selectAll('.pnt').filter(function(p){
							return p[getDispDat()] == swarmAtt;
							})
							.attr('value', 'not_clicked')
							.style('stroke-width', '')
							.style('stroke', '')



						g_line.selectAll('.scat_plot')
							.filter(function(od){return od[getDispDat()]==d[getDispDat()]}) //dispDat
							.remove();

						g_line.selectAll('.scat_plot')
							.style('opacity', '');

						d3.selectAll('.pnt')
							.style('opacity', '')
							.style('fill', function(d){
								if (hasDat(d)) {
									return col_scale(getPntDat(d, year, 'GR'))
									}
								})

						d3.selectAll('.legend_item').style('opacity', '')


						d3.select(this).remove();

						sortLegend();
						positionLegendItem();


					})



					
					d3.select(this).attr('value', 'clicked');
					d3.select(this)
						.style('stroke-width', '3px')
						.style('stroke', uniq_cols.border);



		      		var scat_plot = g_line.append('g')
		      				.classed('scat_plot', true)
		      				.style('opacity', 1e-6)
							.attr('uniq_hue_dat', uniq_hue)
		      				.datum(d)



					var point_dat = _.filter(
										_.get(d, ['nDat',filtParam1, filtParam2, 0, 'Points']),
										function(o){return o['intp']==0}
										)

					console.log('point_dat')
					console.log(point_dat);

					// now done for legend ordering - 
					// var line_dat = line_dat_gen(_.get(d, ['nDat',filtParam1, filtParam2, 0, 'Curve']), yr_max);

					// Con Interval error bars - line generator
					var scat_ci = scat_plot.selectAll('.scat_ci')
								.data(ci_line_dat_gen(point_dat),
								 	function(p){return p['Y']}
								 	);

					scat_ci.enter().append('path').classed('scat_ci', true)
						.attr("fill", "darkgrey")
						.attr("stroke", "darkgrey")
						.attr("stroke-linejoin", "round")
						.attr('stroke-miterlimit', 2)
						.attr("stroke-linecap", "round")
						.attr("stroke-width", 1.5)
						.attr('d', scat_ci_line)
						.attr('display', function(){
							if (d3.select('#CI_butt').attr('value')=='off') {
								return 'none';
							}
							else {
								return '';
							}
						})
						



					var scat = scat_plot.selectAll('.scat')
								.data(point_dat,
								 	function(p){return p['Y']}
								 	);

					scat.enter().append('circle').classed('scat', true)
						.attr('data-swarmDisp', d[getDispDat()]+'') //dispDat
						.attr('r', function(d){
							if (d3.select('#circ_small_butt').attr('value')=='on') {
								return abs_min_rad;
							}
							else {
								return radius(d['n'])
							}
						})
						.attr('cx', function(d){
							return line_yr_scale(d['Y']);
						})
						.attr('cy', function(d){
							return perc_scale(d['GR'])
						})
						.style('fill', '#E1DFE3')
						.style('stroke', uniq_cols.border)
					.merge(scat)
						.on('mouseover', function(d){

							d3.select(this.parentNode).raise();

							swarmAtt = d3.select(this).attr('data-swarmDisp'); //dispDat

							d3.selectAll('.pnt').filter(function(p){
								return p[getDispDat()] != swarmAtt;
							}).style('fill', '#E1DFE3')
							.style('opacity', '0.6');

							var swarm_point = d3.selectAll('.pnt').filter(function(p){
											return p[getDispDat()] == swarmAtt; //dispDat
									})


							tt_fill(
								swarm_point.datum(),
								tooltip
								);

							g_line.selectAll('.scat_plot')
								.filter(function(od){return od[getDispDat()]!=swarmAtt}) //dispDat
								.style('opacity', '0.2');					

					        tooltip
				                .style('top', (d3.event.pageY-150)+'px')
				                .style('left', (d3.event.pageX+5)+'px');



							d3.selectAll('.legend_item')
								.style('opacity', 0.3);
							d3.selectAll('.legend_item')
								.filter(function(d){
									return d['id'] == swarmAtt;
									})
								.style('opacity', 1);


						})
						.on('mouseout', function(d){
							d3.selectAll('.pnt')
								.style('fill', function(d){
									if (hasDat(d)) {
										return col_scale(getPntDat(d, year, 'GR'))
									}
								})
								.style('opacity', function(d){
									if (hasDat(d)) {
										return '';
									}
								});

							g_line.selectAll('.scat_plot')
								.filter(function(od){return od[getDispDat()]!=swarmAtt}) //dispDat
								.style('opacity', '');					


							tooltip.style('visibility', 'hidden');
							tooltip.selectAll('*').remove();

							d3.selectAll('.legend_item').style('opacity', '');


						})
						// Given that whole g is transitioned in, shouldn't be necessary
						// .transition().duration(1000)
						// .style('opacity', 1);


					// Circle for interpolated year?!

					var current_point = scat_plot.selectAll('.scat')
										.filter(function(d){return d['Y'] == year});


					if (current_point.size() == 1) {
						scat_plot.selectAll('.scat').filter(function(d){return d['Y'] == year})
							.raise()
							.style('stroke-width', '3px')
							.style('fill', 
								col_scale(scat_plot.selectAll('.scat').filter(function(d){return d['Y'] == year})
									.datum()['GR'])
								);
					}

					// If need interpolated data point for year
					else {
						scat_plot.append('circle').classed('scat_inter', true)
							.attr('r', function(){
								if (d3.select('#circ_small_butt').attr('value')=='on') {
									return abs_min_rad;
								}
								else {
									return radius(_.get(d, ['nDat',filtParam1, filtParam2, 0, 'mean_n']));
								}
							})
							.attr('cy', perc_scale(_.filter(line_dat, function(o){
								return o['year'] == year;
							})[0]['perc']))
							.attr('cx', line_yr_scale(year))
							.attr('stroke-width', 3)
							.attr('stroke', 'black')
							.style('stroke-dasharray', '3 1')
							.style('fill-opacity', '0');
					};


					scat_plot.append("path").classed('scat_line', true)
						.datum(line_dat)
						.attr('data-swarmDisp', d[getDispDat()]+'') //dispDat
						.attr("fill", "none")
						.attr("stroke", uniq_cols.line)
						.attr("stroke-linejoin", "round")
						.attr('stroke-miterlimit', 2)
						.attr("stroke-linecap", "round")
						.attr("stroke-width", 4)
						.style('stroke-dasharray', '4 6')
						.attr("d", scat_line)
						.style('opacity', '0.65')
						.raise()
						.on('mouseover', function(d){

							d3.select(this.parentNode).raise();

							swarmAtt = d3.select(this).attr('data-swarmDisp'); //dispDat
							d3.selectAll('.pnt').filter(function(p){
								return p[getDispDat()] != swarmAtt; //dispDat
							}).style('fill', '#E1DFE3')
							.style('opacity', '0.6');

							var swarm_point = d3.selectAll('.pnt').filter(function(p){
											return p[getDispDat()] == swarmAtt; //dispDat
									})

							g_line.selectAll('.scat_plot')
								.filter(function(od){return od[getDispDat()]!=swarmAtt}) //dispDat
								.style('opacity', '0.2');						

							tt_fill(
								swarm_point.datum(),
								tooltip
								);

					        tooltip
				                .style('top', (d3.event.pageY-150)+'px')
				                .style('left', (d3.event.pageX+5)+'px');

							d3.selectAll('.legend_item')
								.style('opacity', 0.3);
							d3.selectAll('.legend_item')
								.filter(function(d){
									return d['id'] == swarmAtt;
									})
								.style('opacity', 1);



						})
						.on('mouseout', function(d){
							d3.selectAll('.pnt')
								.style('fill', function(d){
									if (hasDat(d)) {
										return col_scale(getPntDat(d, year, 'GR'))
									}
								})
								.style('opacity', function(d){
									if (hasDat(d)) {
										return '';
									}
								});

							g_line.selectAll('.scat_plot')
								.filter(function(od){return od[getDispDat()]!=swarmAtt}) //dispDat
								.style('opacity', '');							

							tooltip.style('visibility', 'hidden');
							tooltip.selectAll('*').remove();


							d3.selectAll('.legend_item')
								.style('opacity', '');


						});

					scat_plot
						.transition('scat_plot_init').duration(500)
						.style('opacity', 1)



	            	// scatOptsDisp();


				} // end else "not clicked"





 // end scat init
			})



//////////
// Update
//////////







		function filtUpdate(trig_src){

			filtParam1 = filtParams[dispFiltKey[dispMode][0]]

			filtParam2 = filtParams[dispFiltKey[dispMode][1]]

			// if ((dispMode == 'J') && (trig_src=='journ_disc')) {
			// 	dat = getJournDiscSelectDat(journ_unfilt_dat)


			// 	g_bee_swarm.selectAll('*').remove();
			// 	// g_line.selectAll('*').remove();
			// 	// d3.selectAll('.legend_item').remove();

			// 	disp();


			// };


			if ((dispMode == 'J') ) {
				dat = getJournDiscSelectDat(journ_unfilt_dat)
				dat_length = dat.length;


				g_bee_swarm.selectAll('*').remove();
				// g_line.selectAll('*').remove();
				// d3.selectAll('.legend_item').remove();

				disp();


			};


			console.log('Filt Update filt params')
			console.log([filtParam1, filtParam2])

			radius.domain(n_range(dat));

			console.log('\nnew n_range')
			console.log(n_range(dat))

			beeSwarmUpdate();
			scatUpdateFilt();

			// scatOptsDisp();

			reInitFilt();


			legendItemUpdate();
			sortLegend();
			positionLegendItemFilt();


		}





		function reInitFilt(){

			// Logic - filters primed for diaplaying ... so run in disp!!

			all_uniq_disp_opts = getDispOpts(dat);

			all_uniq_filt_one = getFiltOneOpts(dat);
			all_uniq_filt_two = getFiltTwoOpts(dat);




			var active_disp_opts = getDispOpts(dat);

			var active_uniq_filt_one = getActiveFiltOneOpts(dat, all_uniq_filt_one);
			var active_uniq_filt_two = getActiveFiltTwoOpts(dat, all_uniq_filt_two);





			$('.search').select2('destroy').empty().off()
				.select2({
					
					placeholder: 'Search for a ' + dispDatKey[dispMode],
					width: '100%',
					data: _.map(all_uniq_disp_opts, function(o){
								return {
									id: o,
									text: o,
									disabled: checkInActive(o, active_disp_opts)
								}
							})


				})
				
			$('.search').val('').trigger('change')


			$('.search').on('select2:select', function(e){


					var swarm_point = d3.selectAll('.pnt').filter(function(p){

							return p[getDispDat()] == e.params.data.text; 
					})

					console.log('\n swarm point');
					console.log(swarm_point);
					console.log(swarm_point.datum());

					swarm_point.each(function(d,i){
						var click_func = swarm_point.on('click');

						console.log('\nclick func')
						

						click_func.apply(this, [d,i]);

					})


					$('.search').val('').trigger('change')			

			})



			$('.filter_one').select2('destroy').empty().off()
				.select2({
					
					placeholder: 'Search Country',
					width: '100%',
					data: _.map(all_uniq_filt_one, function(c){

						return {
							id: c,
							text: c,
							disabled: checkInActive(c, active_uniq_filt_one),
							selected: checkSelected(c, dispFiltKey[dispMode][0])
						}
					})
				});


			$('.filter_two').select2('destroy').empty().off()
				.select2({
					
					placeholder: 'Search Position',
					width: '100%',
					data: _.map(all_uniq_filt_two, function(c){

						return {
							id: c,
							text: c,
							disabled: checkInActive(c, active_uniq_filt_two),
							selected: checkSelected(c, dispFiltKey[dispMode][1])
						}

					})
				});

			$('.filter_one').on('select2:select', function(e){


				filtParams[dispFiltKey[dispMode][0]] = e.params.data.text;


				filtUpdate();

			})


			$('.filter_two').on('select2:select', function(e){

				filtParams[dispFiltKey[dispMode][1]] = e.params.data.text;

				filtUpdate();

			})


			d3.select('.filt_reset_butt_one').on('click', function(){
				filtParams[dispFiltKey[dispMode][0]]  = default_filtParams[dispFiltKey[dispMode][0]];

				filtUpdate();

			})


			d3.select('.filt_reset_butt_two').on('click', function(){
				filtParams[dispFiltKey[dispMode][1]]  = default_filtParams[dispFiltKey[dispMode][1]];

				filtUpdate();

			})

			d3.select('.search_reset_butt').on('click', function(){


				if(dispMode=='J') {

					var sel_legs = d3.selectAll('.legend_item')

					sel_legs.each(function(d,i){
						var click_func = d3.select(this).on('click');

						console.log('\nclick func')

						click_func.apply(this, [d,i]);

					})



				}
				else {

					var sel_swarm_points = d3.selectAll('.pnt').filter(function(p){

							return d3.select(this).attr('value') == 'clicked' 
					})

					sel_swarm_points.each(function(d,i){
						var click_func = sel_swarm_points.on('click');

						console.log('\nclick func')

						click_func.apply(this, [d,i]);

					})

				}

				$('.search').val('').trigger('change')			



			})

			if (dispMode == 'J') {

				all_uniq_disc_opts = getJournDiscOpts(journ_unfilt_dat);
				var active_disc_opts = getActiveJournDiscOpts(dat, all_uniq_disc_opts);

				$('.disc_filt').select2('destroy').empty().off()
					.select2({
						
						placeholder: 'Search Discipline',
						width: '100%',
						data: _.map(all_uniq_disc_opts, function(c){

							return {
								id: c,
								text: c,
								disabled: checkInActive(c, active_disc_opts),
								selected: checkSelectedJournDisc(c)
							}
						})
					});


				$('.disc_filt').on('select2:select', function(e){
					disc = e.params.data.text;

					filtUpdate('journ_disc');
				})

				d3.select('.disc_butt_reset').on('click', function(){
					disc = default_disc;

					filtUpdate('journ_disc');

				})



			};


		}








		// Update the scatter on filter change
		function scatUpdateFilt(){

		// Basic logic is:
			// if there is data for state of filters - 
				// Check if each of scat elements are in g element (scat, ci, line, scat_inter)
				// If so, then transition to new state
				// if not, add new elements much like scat init but with opacity transition
			// if no data for state of filters, keep g element, but remove contents



			// Go through each scat plot g element, and deal with it!
			d3.selectAll('.scat_plot').each(function(el_dat){


				var this_scat = d3.select(this);


				// check if scat plot has data

				if (_.get(el_dat, ['nDat',filtParam1, filtParam2], undefined)){
					console.log('I has the data')


					var point_dat = _.filter(
							_.get(el_dat, ['nDat',filtParam1, filtParam2, 0, 'Points']),
							function(o){return o['intp']==0}
						)

					console.log('point dat')
					console.log(point_dat)


					// CI management

					this_scat.selectAll('.scat_ci')
						// .transition().duration(100)
						// .style('opacity', 1e-6)
						.remove();

					console.log('ci dat')
					console.log(ci_line_dat_gen(point_dat))

					var scat_ci = this_scat.selectAll('.scat_ci')
								.data(ci_line_dat_gen(point_dat),
								 	function(p){return p['Y']}
								 	);


					console.log('scat_ci')
					console.log(scat_ci)

					scat_ci.enter().append('path').lower()
						// .merge(scat_ci)
						.classed('scat_ci', true)
						.style('opacity', 1e-6)
						.attr("fill", "none")
						.attr("stroke", "darkgrey")
						.attr("stroke-linejoin", "round")
						.attr('stroke-miterlimit', 2)
						.attr("stroke-linecap", "round")
						.attr("stroke-width", 1.5)
						.attr('d', scat_ci_line)
						.attr('display', function(){
							if (d3.select('#CI_butt').attr('value')=='off') {
								return 'none';
							}
							else {
								return '';
							}
						})
						.transition('scat_ci_re_enter').duration(100).delay(1000)
						.style('opacity', 1)



					//Scat management

					var scat = this_scat.selectAll('.scat')
						.data(point_dat, function(p){
							return p['Y'];
								}
						)


					// var stroke_col = this_scat.selectAll('.scat').style('stroke');

					var this_uniq_hue = this_scat.attr('uniq_hue_dat');

					var uniq_cols = uniqColsGen(this_uniq_hue);

					scat.exit()
						.transition('scat_exit').duration(1000)
						.style('opacity', 1e-6)
						.remove();

					scat.transition('scat_move').duration(1000)
						.attr('r', function(d){
							if (d3.select('#circ_small_butt').attr('value')=='on') {
								return abs_min_rad;
							}
							else {
								return radius(d['n'])
							}
						})
						.attr('cx', function(d){
							return line_yr_scale(d['Y']);
						})
						.attr('cy', function(d){
							return perc_scale(d['GR'])
						});


					scat.enter().append('circle').classed('scat', true)
							.style('opacity', 1e-6)
							.attr('data-swarmDisp', el_dat[getDispDat()]+'') //dispDat
							.attr('r', function(d){
								if (d3.select('#circ_small_butt').attr('value')=='on') {
									return abs_min_rad;
								}
								else {
									return radius(d['n'])
								}
							})
							.attr('cx', function(d){
								return line_yr_scale(d['Y']);
							})
							.attr('cy', function(d){
								return perc_scale(d['GR'])
							})
							.style('fill', '#E1DFE3')
							.style('stroke', uniq_cols.border)
							.on('mouseover', function(d){

								d3.select(this.parentNode).raise();

								swarmAtt = d3.select(this).attr('data-swarmDisp'); //dispDat

								d3.selectAll('.pnt').filter(function(p){
									return p[getDispDat()] != swarmAtt;
								}).style('fill', '#E1DFE3')
								.style('opacity', '0.6');

								var swarm_point = d3.selectAll('.pnt').filter(function(p){
												return p[getDispDat()] == swarmAtt; //dispDat
										})


								tt_fill(
									swarm_point.datum(),
									tooltip
									);

								g_line.selectAll('.scat_plot')
									.filter(function(od){return od[getDispDat()]!=swarmAtt}) //dispDat
									.style('opacity', '0.2');					

						        tooltip
					                .style('top', (d3.event.pageY-150)+'px')
					                .style('left', (d3.event.pageX+5)+'px');
							})
							.on('mouseout', function(d){
								d3.selectAll('.pnt')
									.style('fill', function(d){
										if (hasDat(d)) {
											return col_scale(getPntDat(d, year, 'GR'))
										}
									})
									.style('opacity', function(d){
										if (hasDat(d)) {
											return '';
										}
									});

								g_line.selectAll('.scat_plot')
									.filter(function(od){return od[getDispDat()]!=swarmAtt}) //dispDat
									.style('opacity', '');					


								tooltip.style('visibility', 'hidden');
								tooltip.selectAll('*').remove();


							})
							.transition('scat_enter').duration(1000)
							.style('opacity', 1);


					// Year highlight
					var current_point = this_scat.selectAll('.scat')
											.filter(function(d){
												return d['Y'] == year
											});
					var current_point_dat = point_dat.filter(function(pd){
						return pd['Y'] == year
					})

					if (current_point_dat.length == 1){

						this_scat.selectAll('.scat')
							.sort(function(a, b) {
							  return a['Y'] < b['Y'] ? -1 : a['Y'] > b['Y'] ? 1 : a['Y'] >= b['Y'] ? 0 : NaN;
							})
							.style('fill', '#E1DFE3')
							.style('stroke-width', 'initial');

						current_point
							.raise()
							.style('stroke-width', '3px')
							.style('fill', 
							col_scale(current_point.datum()['GR'])
							);
					};




					// Line management

					var line_dat = line_dat_gen(
								_.get(el_dat, ['nDat',filtParam1, filtParam2, 0, 'Curve']), yr_max
								);


					// If there's a line
					if (!this_scat.selectAll('.scat_line').empty()) {


						this_scat.selectAll('.scat_line')
							.datum(line_dat)
							.transition('scat_line_move').duration(1000)
							.attr("d", scat_line)
							
						this_scat.selectAll('.scat_line').raise();

					}

					else {

						this_scat.append("path").classed('scat_line', true)
							.datum(line_dat)
							.attr('data-swarmDisp', el_dat[getDispDat()]+'') //dispDat
							.attr("fill", "none")
							.attr("stroke", uniq_cols.line)
							.attr("stroke-linejoin", "round")
							.attr('stroke-miterlimit', 2)
							.attr("stroke-linecap", "round")
							.attr("stroke-width", 4)
							.style('stroke-dasharray', '4 6')
							.attr("d", scat_line)
							.style('opacity', 1e-6)
							.raise()
							.on('mouseover', function(d){

								d3.select(this.parentNode).raise();

								swarmAtt = d3.select(this).attr('data-swarmDisp'); //dispDat
								d3.selectAll('.pnt').filter(function(p){
									return p[getDispDat()] != swarmAtt; //dispDat
								}).style('fill', '#E1DFE3')
								.style('opacity', '0.6');

								var swarm_point = d3.selectAll('.pnt').filter(function(p){
												return p[getDispDat()] == swarmAtt; //dispDat
										})

								g_line.selectAll('.scat_plot')
									.filter(function(od){return od[getDispDat()]!=swarmAtt}) //dispDat
									.style('opacity', '0.2');						

								tt_fill(
									swarm_point.datum(),
									tooltip
									);

						        tooltip
					                .style('top', (d3.event.pageY-150)+'px')
					                .style('left', (d3.event.pageX+5)+'px');
							})
							.on('mouseout', function(d){
								d3.selectAll('.pnt')
									.style('fill', function(d){
										if (hasDat(d)) {
											return col_scale(getPntDat(d, year, 'GR'))
										}
									})
									.style('opacity', function(d){
										if (hasDat(d)) {
											return '';
										}
									});

								g_line.selectAll('.scat_plot')
									.filter(function(od){return od[getDispDat()]!=swarmAtt}) //dispDat
									.style('opacity', '');							

								tooltip.style('visibility', 'hidden');
								tooltip.selectAll('*').remove();
							})
							.transition('scat_line_enter').duration(1000)
							.style('opacity', 0.65);

					} // end else




					//Interpolated point management


					// if an interpolated point is there
					if (current_point_dat.length == 0 && !this_scat.selectAll('.scat_inter').empty()) {

						this_scat.selectAll('.scat_inter')
							.transition('scat_inter_move').duration(1000)
							.attr('r', function(){
								if (d3.select('#circ_small_butt').attr('value')=='on') {
									return abs_min_rad;
								}
								else {
									return radius(_.get(el_dat, ['nDat',filtParam1, filtParam2, 0, 'mean_n']));
								}
							})
							.attr('cy', perc_scale(_.filter(line_dat, function(o){
								return o['year'] == year;
							})[0]['perc']))
							.attr('cx', line_yr_scale(year))


					}

					else if (current_point_dat.length == 0) {

						this_scat.append('circle').classed('scat_inter', true)
							.style('opacity', 1e-6)
							.attr('r', function(){
								if (d3.select('#circ_small_butt').attr('value')=='on') {
									return abs_min_rad;
								}
								else {
									return radius(_.get(el_dat, ['nDat',filtParam1, filtParam2, 0, 'mean_n']));
								}
							})
							.attr('cy', perc_scale(_.filter(line_dat, function(o){
								return o['year'] == year;
							})[0]['perc']))
							.attr('cx', line_yr_scale(year))
							.attr('stroke-width', 3)
							.attr('stroke', 'black')
							.style('stroke-dasharray', '3 1')
							.style('fill-opacity', '0')
							.transition('scat_inter_enter').duration(1000)
							.style('opacity', 1);

					}

					// for when there was an interpolated point and now there shouldn't be 
					else if (current_point_dat.length > 0){

						this_scat.selectAll('.scat_inter')
							.remove();
					}



	






				} // end if scat plot has data

				else { // if not data for set of filters

					this_scat.selectAll('*').remove();
					
				}




			// end scat_plot each function

			})

		}


		// Update scatter on year change
		function scatUpdateYear(){
			d3.selectAll('.scat_inter').remove();

			d3.selectAll('.scat_plot').each(function(d){

				// if scat plot has data, then manipulate.
				if (_.get(d, ['nDat',filtParam1, filtParam2], undefined)) {

					var this_scat = d3.select(this);


					// data point for current year
					var current_point = this_scat.selectAll('.scat').filter(function(d){return d['Y'] == year});

					if (current_point.size() == 1){

						this_scat.selectAll('.scat')
							.sort(function(a, b) {
							  return a['Y'] < b['Y'] ? -1 : a['Y'] > b['Y'] ? 1 : a['Y'] >= b['Y'] ? 0 : NaN;
							})
							.style('fill', '#E1DFE3')
							.style('stroke-width', 'initial');

						current_point
							.raise()
							.style('stroke-width', '3px')
							.style('fill', 
							col_scale(current_point.datum()['GR'])
							);

						this_scat.selectAll('.scat_line').raise();
					} 

					else {

						this_scat.selectAll('.scat')
							.style('fill', '#E1DFE3')
							.style('stroke-width', 1);
						interp_dat = this_scat.selectAll('.scat_line').datum();



						this_scat.append('circle').classed('scat_inter', true)
							.attr('r', function(){
								if (d3.select('#circ_small_butt').attr('value')=='on') {
									return abs_min_rad;
								}
								else {
									return radius(_.get(d, ['nDat',filtParam1, filtParam2, 0, 'mean_n']));
								}
							})
							.attr('cy', perc_scale(_.filter(interp_dat, function(o){
								return o['year'] == year;
							})[0]['perc']))
							.attr('cx', line_yr_scale(year))
							.attr('stroke-width', 3)
							.attr('stroke', 'black')
							.style('stroke-dasharray', '3 1')
							.style('fill-opacity', '0');
					};
				} // end if

			}); // end each function

		} // end scat year update function





		// Sorting functions for legend



		function legendItemUpdate(){

			d3.selectAll('.legend_item')
				.each(function(d){

					console.log('\n legend item dat')
					console.log(d)


					var scat_dat = d3.selectAll('.scat_plot')
									.filter(function(sd){
										return sd[getDispDat()] == d['id'];
										})
									.datum()
					this_leg_item = d3.select(this);


					if (_.get(scat_dat, ['nDat',filtParam1, filtParam2], undefined)) {


							var line_dat = line_dat_gen(
									_.get(scat_dat, ['nDat',filtParam1, filtParam2, 0, 'Curve']), yr_max
								);

							var new_dat = _.cloneDeep(d);

							new_dat['ord_val'] = _.filter(line_dat, function(o){
														return o['year'] == yr_max;
													})[0]['perc']

							this_leg_item.datum(new_dat)

							var uniq_cols = uniqColsGen(this_leg_item.attr('uniq_hue_dat'))

							this_leg_item.select('div').style('color', uniq_cols.border)

							this_leg_item.select('svg').select('circle').style('stroke', uniq_cols.border)

					}

					else {


							var new_dat = _.cloneDeep(d);

							new_dat['ord_val'] = 0;

							this_leg_item.datum(new_dat)

							this_leg_item.select('div').style('color', 'lightgrey')

							this_leg_item.select('svg').select('circle').style('stroke', 'lightgrey')

					}
				})
		}


		function sortLegend(){

			d3.selectAll('.legend_item').sort(function(a,b){
				return a['ord_val'] < b['ord_val'] ? 1 : a['ord_val'] > b['ord_val'] ? -1 : a['ord_val'] >= b['ord_val'] ? 0 : NaN;})

		}

		function positionLegendItem(){

			var leg_item = d3.selectAll('.legend_item')

			leg_item
			.transition('leg_item_pos').duration(500)
			.style('top', function(d,i){

				console.log(this)


				if (i == 0){
						return '0px';
					}

				else {

					return _.sumBy(leg_item.nodes().slice(0, (i)), function(n){
						return n.getBoundingClientRect()['height']
						}) + 'px';

					 
					// var prev_pos = leg_item
					// 				.nodes()[(i-1)].getBoundingClientRect()

					// return ((prev_pos['top']-this.parentNode.getBoundingClientRect()['top'])+prev_pos['height'])+'px'
				}

			})

		}


		function positionLegendItemFilt(){

			var leg_item = d3.selectAll('.legend_item')

			leg_item
			.transition('leg_item_pos_filt').duration(1000)
			.style('top', function(d,i){

				console.log(this)


				if (i == 0){

						return '0px';

					}

				else {

					return _.sumBy(leg_item.nodes().slice(0, (i)), function(n){
						return n.getBoundingClientRect()['height']
						}) + 'px';

					 
					// var prev_pos = leg_item
					// 				.nodes()[(i-1)].getBoundingClientRect()

					// return ((prev_pos['top']-this.parentNode.getBoundingClientRect()['top'])+prev_pos['height'])+'px'
				}

			})

		}





		// Update beeswarm on year or filter change
		function beeSwarmUpdate(){
			d3.selectAll('.pnt')
				.attr('r', function(d){
						if (hasDat(d)) {
							if(getPntDat(d, year, 'intp')==0){
								return radius(
									getPntDat(d, year, 'n')
										)
									}
							else {
								return radius(
									_.get(d, ['nDat',filtParam1, filtParam2, 0, 'mean_n'])
										)
								}
							}
						else {
							return 0;
						}
					})
				.style('stroke-dasharray', function(d){

					if(hasDat(d)) {
						if(getPntDat(d, year, 'intp')==1){
							return '3 1';
								}
						else {
							return 'initial';
						}
					}

				})
				.style('stroke-dashoffset', function(d){
					if (hasDat(d)){
						if(getPntDat(d, year, 'intp')==1){
							return '3';
								}
						else {
							return 'initial';

							}

						}
					}
				)
				.style('fill', function(d){
					if (hasDat(d)){
						return col_scale(getPntDat(d, year, 'GR'))
						}
					}
				)
				// .style('opacity', function(d){
				// 		if(getPntDat(d, year, 'intp')==0){
				// 			return 0.6
				// 				}
				// 		else {
				// 			return 0.4;

				// 		}
				// 		}

				// )

				// Calc range of radii in order to scale repulsive force
				var radii = dat.map(function(d){

					if (hasDat(d)){

						if(getPntDat(d, year, 'intp')==0){
							return radius(
								getPntDat(d, year, 'n')
									)
								}
						else {
							return radius(
								_.get(d, ['nDat',filtParam1, filtParam2, 0, 'mean_n'])
									)
						}
					}

				})

				var rad_range = d3.max(radii)-d3.min(radii)

				simulation.force("y", 
					d3.forceY(function(d){

						if (hasDat(d)) {

							return perc_scale(
								getPntDat(d, year, 'GR')
								)
							}

						else{
							return perc_scale(50) // Highest possible
						}
					}).strength(0.99)
				)
				.force('x', d3.forceX(function(d){

						if (hasDat(d)) {
							return width/2;
						}
						else {
							return 0;
						}

					}).strength(0.07)
				)
				.force("collide", 
					d3.forceCollide(function(d){


						if (hasDat(d)) {

							if(getPntDat(d, year, 'intp')==0){
								return radius(
									getPntDat(d, year, 'n')
										)
									}
							else {
								return radius(
									_.get(d, ['nDat',filtParam1, filtParam2, 0, 'mean_n'])
										)

								}
							}
						else {
							return 0;
							}

						}
				))
				.force('repulsion', d3.forceManyBody()
						.strength(-15 * Math.sqrt((100 / dat_length) * 10*(rad_range/(abs_max_rad- abs_min_rad)))  )
						.distanceMax(90)
				)


				if (typeof sim_repuls_TO !== 'undefined') {
					clearTimeout(sim_repuls_TO);
				}

				if (typeof sim_second_heat_TO !== 'undefined'){
					clearTimeout(sim_second_heat_TO)
				}


				simulation.alpha(0.05)
							.restart();



				sim_repuls_TO = setTimeout(function(){
					simulation.force('repulsion', d3.forceManyBody().strength(0))
				}, 700)

				sim_second_heat_TO = setTimeout(function(){
					simulation.alpha(0.2).restart();
				}, 1300)

		}




		// Year Slider

		d3.select('#year_slider').on("input", function(){

			year = parseInt(this.value);

			year_text.text(year);


			beeSwarmUpdate();
			scatUpdateYear()



			})



		// scat disp opts

			function initScatOptsButt(){

			    d3.selectAll('#CI_butt, #circ_small_butt')
			        .style('background-color', function(){
			            if (d3.select(this).attr('value') == 'on') {
			                return toggleButt('off', 'background')
			            }

			        })
			        .on('click', function(){

			            this_butt = d3.select(this);
			            console.log('\b this BUTT')
			            console.log(this_butt.attr('id'))
			            
			            var state = this_butt.attr('value');

			            this_butt
			                .attr('value', toggleButt(state, 'val'))
			                .style('background-color', toggleButt(state, 'background'));

		                scatOptsDisp(this_butt.attr('id'));
			        })

			    
			}


			function scatOptsDisp(button){

				if (button == 'CI_butt') {

				    var ci_state = d3.select('#CI_butt').attr('value')

				    if (ci_state=='off') {
				            d3.selectAll('.scat_ci').attr('display', 'none')
				    }

				    else {
				            d3.selectAll('.scat_ci').attr('display', '')
				    }
				}

				else if (button == 'circ_small_butt') {

				    var circ_state = d3.select('#circ_small_butt').attr('value')


				    if (circ_state=='on') {
				            d3.selectAll('.scat')
				            	.transition('scat_opts_disp_rad').duration(400)
				            	.attr('r', abs_min_rad)
			            	d3.selectAll('.scat_inter')
			            		.transition('scat_opts_disp_rad_inter').duration(400)
			            		.attr('r', abs_min_rad)

				    }

				    else {
			    		scatUpdateFilt();
				    }

				};

			}





		} // end disp function
















// End file callback
})