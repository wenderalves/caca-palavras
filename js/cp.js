/* ======= CAÇA PALAVRAS =======
   author: Wender Alves Sobrinho
   wender_net@hotmail.com
=================================*/

var cp = {
	
	//variaveis padrão do caça palavras
	def:{
		 linhas:8
		,colunas: 26
		,letras: 'A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,X,W,Y,Z,Ã,Õ,Á,É,Í,Ó,Ú,Â,Ê,Ô,Ç'.split(',')
		,palavras: []
		,listaP: []
		,nivel: 'facil'
	},
	
	
	// Adicionar Palavra
	addPalavra: function(p){		
		//se for um objeto
		if (typeof p === 'object'){						
			
			for(var i = 0; i < p.length; i++ ){
				var pal = this.gerarPalavras(p[i]) //gera a palavra temporária
				, valida = this.validaLetra(pal);
				
				while(valida === false){
					pal = this.gerarPalavras(p[i]);	
					valida = this.validaLetra(pal)
					if(valida){
						continue;
					}
				}
				
				if(valida){
					this.def['listaP'].push(pal); //insere na lista de palavras finais
				}
				
			}		
		}
	},
	
	
	validaLetra:function(p){
		var t = this.def['listaP'].length, err=0;
		//se this.def['palavras'] !== 0 faz o loop		
		for( var lis=0; lis < t; lis++){//loop lista de palavras
			for( var Pa=0; Pa < this.def['listaP'][lis].length; Pa++ ){   //loop das palavras
				for( var letra = 0; letra < p.length; letra++){
					//console.log(p[letra]);
					if( 							
						this.def['listaP'][lis][Pa].lin === p[letra].lin && this.def['listaP'][lis][Pa].col === p[letra].col
					){							
						if(this.def['listaP'][lis][Pa].letra !== p[letra].letra){
							err++;
						}
					}
				}				
			}
		}
		if(err > 0){
			err = 0;
			return false;
		}else{
			return true;
		}		
	
	},
	
	
	// Gera a posição das palavras
	gerarPalavras: function(p){
		var calcDir = {
				    CIMA:{ linha:-1, coluna: 0 } 
			,     FRENTE:{ linha: 0, coluna: 1 }
			,      BAIXO:{ linha: 1, coluna: 0 }
			,       TRAS:{ linha:-1, coluna:-1 }
			,FRENTEBAIXO:{ linha: 1, coluna: 1 }
			, FRENTECIMA:{ linha:-1, coluna: 1 }
			,  TRASBAIXO:{ linha: 1, coluna:-1 }
			,   TRASCIMA:{ linha:-1, coluna:-1 }
		}, posLetras = [];
		
		var direcao = this.geraPosicao(p, this.def['nivel']);
		
		while( direcao['direcao'].length == 0 ){
			direcao = this.geraPosicao(p, this.def['nivel']);
		}
		
		var dir =  Math.floor( Math.random() * direcao['direcao'].length );
			
		for( var i = 0; i < p.length; i++ ){			
			if (i == 0){
				var letr, lin = direcao['linha'], col = direcao['coluna'];
				letr = {letra:p[i], lin, col};
				posLetras.push(letr);
				continue;
			}
				
			lin = lin + calcDir[direcao['direcao'][dir]].linha;
			col = col + calcDir[direcao['direcao'][dir]].coluna;
			letr = {letra:p[i], lin, col};
			posLetras.push(letr);			
		}
		
		return posLetras;
	},
	
	
	//sorteia entre as possíveis posições
	geraPosicao: function(p, nivel){
		var 
		 posLinha  = Math.floor( Math.random() * this.def['linhas'] )
		,posColuna = Math.floor( Math.random() * this.def['colunas']);
		
		var dir = [];
		
		switch(nivel){
			case 'facil':
				//frente
				if( (this.def['colunas'] - posColuna) >= p.length ){
					dir.push('FRENTE');
				}
				//baixo
				if( (this.def['linhas'] - posLinha) >= p.length ){
					dir.push('BAIXO');
				}
				//frentebaixo
				if( (this.def['colunas'] - posColuna) >= p.length && (this.def['linhas'] - posLinha) >= p.length ){
					dir.push('FRENTEBAIXO');
				}
				//frentecima
				if( (this.def['colunas'] - posColuna) >= p.length  && (this.def['linhas'] - p.length) > 0 && (posLinha - p.length) > 0 ){
					dir.push('FRENTECIMA');
				}
				
				return { direcao:dir, linha:posLinha, coluna:posColuna };
			break;
			default:
				//frente
				if( (this.def['colunas'] - posColuna) >= p.length ){
					dir.push('FRENTE');
				}
				//baixo
				if( (this.def['linhas'] - posLinha) >= p.length ){
					dir.push('BAIXO');
				}
				//frentebaixo
				if( (this.def['colunas'] - posColuna) >= p.length && (this.def['linhas'] - posLinha) >= p.length ){
					dir.push('FRENTEBAIXO');
				}
				//frentecima
				if( (this.def['colunas'] - posColuna) >= p.length  && (this.def['linhas'] - p.length) > 0 && (posLinha - p.length) > 0 ){
					dir.push('FRENTECIMA');
				}
				
				return { direcao:dir, linha:posLinha, coluna:posColuna };
			break;			
		}
		
		
	},
	
	
	// Gera o quadrante de Resposta
	gerarRespostas: function(){
		
		var strCP = "" 
		 ,matriz = this.def['listaP']				
		 ,arrVer = []
		 ,arrHor = [];
		
		for(var v = 0; v < this.def['linhas']; v++)
		{
			for(var h = 0; h < this.def['colunas']; h++)
			{
				arrHor.push("■");
			}	
			arrVer[v] = arrHor;
			arrHor = [];
		}		
		
		
		for(var linha=0; linha < arrVer.length; linha++){			   //loop vertical (linhas)
			for(var coluna=0; coluna < arrVer[linha].length; coluna++){     //loop horizontal (colunas)
			
				for(var pal=0; pal < matriz.length; pal++){                //loop nas palavras
					for(var letr=0; letr < matriz[pal].length; letr++){	   //loop nas letras
						
						if( matriz[pal][letr].lin == linha && matriz[pal][letr].col == coluna){
							arrVer[linha][coluna] = matriz[pal][letr].letra;							
						}
						
					}
				}
				
			}
		}
		//console.log(arrVer);
		for(var li=0; li < arrVer.length; li++){
			for(var cl=0; cl < arrVer[li].length; cl++){				
				if( cl == 0 )
				{
					strCP += arrVer[li][cl];
				}else{
					strCP += " " + arrVer[li][cl];
				}
			}
			strCP += "\n";
		}
		
		
		return strCP.toUpperCase();
	
	},
	

	// Gerar o caça palavras
	gerarCP: function(){
	
		var strCP = "" 
		 ,matriz = this.def['listaP']				
		 ,arrVer = []
		 ,arrHor = [];
		
		for(var v = 0; v < this.def['linhas']; v++)
		{
			for(var h = 0; h < this.def['colunas']; h++)
			{
				arrHor.push("*");
			}	
			arrVer[v] = arrHor;
			arrHor = [];
		}		
		
		
		for(var linha=0; linha < arrVer.length; linha++){			   //loop vertical (linhas)
			for(var coluna=0; coluna < arrVer[linha].length; coluna++){     //loop horizontal (colunas)
			
				for(var pal=0; pal < matriz.length; pal++){                //loop nas palavras
					for(var letr=0; letr < matriz[pal].length; letr++){	   //loop nas letras						
						if( matriz[pal][letr].lin === linha && matriz[pal][letr].col === coluna){
							arrVer[linha][coluna] = matriz[pal][letr].letra;							
						}						
						if(arrVer[linha][coluna] == "*"){							
							arrVer[linha][coluna] = this.def['letras'][Math.floor(Math.random() * this.def['letras'].length)];
						}						
					}
				}
				
			}
		}
		//console.log(arrVer);
		for(var li=0; li < arrVer.length; li++){
			for(var cl=0; cl < arrVer[li].length; cl++){				
				if( cl == 0 )
				{
					strCP += arrVer[li][cl];
				}else{
					strCP += " " + arrVer[li][cl];
				}
			}
			strCP += "\n";
		}
		
		
		return strCP.toUpperCase();
	
	},
	
	
	// Função principal do caça palavras
	cacapalavras: function(palavras, linhas, colunas){
		this.def['palavras'] = []; //limpa o array palavras
		this.def['listaP'] = [];   //limpa o array da lista de posições
		
		//separa palavras em letras
		var pa = palavras.replace(/\s/gi,'').split(/,/g);
		
		for(var i = 0; i < pa.length; i++ ){
			this.def['palavras'].push( pa[i].split('') );
		};
		
		if(linhas !== null || linhas !== ""){ this.def['linhas'] = linhas };
		if(colunas !== null || colunas !== ""){ this.def['colunas'] = colunas }
		
		//adiciona as palavras
		this.addPalavra(this.def['palavras']);
		
		var re = this.gerarRespostas();
		
		return { resposta: re, cacapalavra:this.gerarCP()};
	}
	
}