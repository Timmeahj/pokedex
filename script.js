(() => {

	var searchButton = document.getElementById("goSearch");
	var evolve1 = document.getElementById("first");
	var evolve2 = document.getElementById("second");
	var evolve3 = document.getElementById("third");


	function goEvolution(search){	
		fetch(search) 
			.then(function(response) {
				return response.json();
			})
			.then(function(pokemon) {

				var picture = pokemon.sprites.front_default;
				id = parseInt(pokemon.id);
				var nextId = parseInt(id+1);
				var prevId = parseInt(id-1);
				next = "https://pokeapi.co/api/v2/pokemon/" + nextId;
				previous = "https://pokeapi.co/api/v2/pokemon/" + prevId;
				var name = pokemon.forms[0].name;

				if(id>1){
					document.getElementById("previous").classList.remove("gone");
				}
				if(id<807){
					document.getElementById("next").classList.remove("gone");
				}

				var allMoves = pokemon.moves;
				var shuffledMoves = allMoves.sort(() => 0.5 - Math.random());
				var moves = shuffledMoves.slice(0, 4);

				var move1 = moves[0].move.name;
				var move2 = moves[1].move.name;
				var move3 = moves[2].move.name;
				var move4 = moves[3].move.name;

				//put picture
				document.getElementById("picture").innerHTML = "<img src='"+picture+"'>";
				//put id
				document.getElementById("id").innerHTML = id;

            	//put name
            	document.getElementById("name").innerHTML = name;

	            //put 4 moves
	            document.getElementById("move1").innerHTML = move1;
	            document.getElementById("move2").innerHTML = move2;
	            document.getElementById("move3").innerHTML = move3;
	            document.getElementById("move4").innerHTML = move4;



				fetch(pokemon.species.url) 
					.then(function(response) {
						return response.json();
					})
					.then(function(species) {
						fetch(species.evolution_chain.url) 
							.then(function(response) {
								return response.json();
							})
							.then(function(evolution) {
								//if it evolves
								console.log(evolution, species)
								if(evolution.chain.evolves_to.length == 1){
									one = ""+evolution.chain.species.url.replace('-species','')+"";
									console.log(evolution.chain.species.url);
									two = ""+evolution.chain.evolves_to[0].species.url.replace('-species','')+"";

									if(evolution.chain.evolves_to[0].evolves_to[0] != undefined){

										three = ""+evolution.chain.evolves_to[0].evolves_to[0].species.url.replace('-species','')+"";

										fetch(one)
											.then(function(response) {
												return response.json();
											})
											.then(function(firstEvo) {
												evolve1.classList.remove("gone");
												evolve1.innerHTML = "<img src='"+firstEvo.sprites.front_default+"'>";
											});

										fetch(two)
											.then(function(response) {
												return response.json();
											})
											.then(function(secondEvo) {
												evolve2.classList.remove("gone");
												evolve2.innerHTML = "<img src='"+secondEvo.sprites.front_default+"'>";
											});

										fetch(three)
											.then(function(response) {
												return response.json();
											})
											.then(function(thirdEvo) {
												evolve3.classList.remove("gone");
												evolve3.innerHTML = "<img src='"+thirdEvo.sprites.front_default+"'>";
											});
									}
									else{
										fetch(one)
											.then(function(response) {
												return response.json();
											})
											.then(function(firstEvo) {
												evolve1.classList.remove("gone");
												evolve1.innerHTML = "<img src='"+firstEvo.sprites.front_default+"'>";
											});

										fetch(two)
											.then(function(response) {
												return response.json();
											})
											.then(function(secondEvo) {
												evolve2.classList.remove("gone");
												evolve2.innerHTML = "<img src='"+secondEvo.sprites.front_default+"'>";
											});
										evolve3.innerHTML = "";
										evolve3.classList.add("gone");

									}
								}
								if(evolution.chain.evolves_to.length > 1){
									//exceptions like eevee
									one = ""+evolution.chain.species.url.replace('-species','')+"";
									fetch(one)
										.then(function(response) {
											return response.json();
										})
										.then(function(firstEvo) {
											evolve1.classList.remove("gone");
											evolve1.innerHTML = "<img src='"+firstEvo.sprites.front_default+"'>";
										});

									var i = Math.floor(Math.random() * (evolution.chain.evolves_to.length-1)) + 0;
									two = ""+evolution.chain.evolves_to[i].species.url.replace('-species','')+"";
									fetch(two)
										.then(function(response) {
											return response.json();
										})
										.then(function(secondEvo) {
											evolve2.classList.remove("gone");
											evolve2.innerHTML = "<img src='"+secondEvo.sprites.front_default+"'>";
										});

									slide = setInterval(function(){ 
										if(i < evolution.chain.evolves_to.length-1){
											i++;
										}
										else{
											i=0;
										}
										console.log(i);
										two = ""+evolution.chain.evolves_to[i].species.url.replace('-species','')+"";
										fetch(two)
											.then(function(response) {
												return response.json();
											})
											.then(function(secondEvo) {
												evolve2.classList.remove("gone");
												evolve2.innerHTML = "<img src='"+secondEvo.sprites.front_default+"'>";
											});
									}, 1000);

									evolve3.innerHTML = "";
									evolve3.classList.add("gone");
								}
								else{
									evolve1.innerHTML = "";
									evolve1.classList.add("gone");
									evolve2.innerHTML = "";
									evolve2.classList.add("gone");
									evolve3.innerHTML = "";
									evolve3.classList.add("gone");
								}
					  		});
			  		});

	  		});
	}	 

	slide = 0;

	document.getElementById("first").addEventListener("click", function() {
		//var one = ""+evolution.chain.species.url.replace('-species','')+"";
		clearInterval(slide);
		goEvolution(one);
	});
								
	//if second evolution

	document.getElementById("second").addEventListener("click", function() {
		clearInterval(slide);
		goEvolution(two);
	});
								
	//if third evolution

	document.getElementById("third").addEventListener("click", function() {
		clearInterval(slide);
		goEvolution(three);
	});

	searchButton.addEventListener("click", function() {
		clearInterval(slide);
		var search = "https://pokeapi.co/api/v2/pokemon/" + document.getElementById("search").value;  		
		goEvolution(search);
	});

	document.getElementById("previous").addEventListener("click", function() {
		clearInterval(slide);
		goEvolution(previous);
	});

	document.getElementById("next").addEventListener("click", function() {
		clearInterval(slide);
		goEvolution(next);
	});

	goEvolution("https://pokeapi.co/api/v2/pokemon/1");

})();