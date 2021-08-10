let expirationDate = null
let amount = null
let barCode = null

module.exports = class Ticket {

    async getTickets(param) {
        try {

            expirationDate, amount, barCode = null

            barCode = await this.creatCodeBar(param.linhaDigitavel);             
            
            await this.validatorsDueDate(param);
            
            return {barCode,amount,expirationDate}

        
        } catch (e) {
            throw e
        }
    }

    async creatCodeBar(linhaDigitavel) {
            try {
                                
                let barra  = linhaDigitavel.replace(/[^0-9]/g,'');
               
                // if (barra.length < 47 ) {
                //     barra = barra + '00000000000'.substr(0,47-barra.length);
                // }

                if (barra.length != 47) {
                    throw new Error('A linha do código de barras está incompleta!');
                }
               
                barra  = barra.substr(0,4)
                    +barra.substr(32,15)
                    +barra.substr(4,5)
                    +barra.substr(10,10)
                    +barra.substr(21,10);

                var aux = await this.moduleNumber11(barra.substr(0,4)+barra.substr(5,39));
                
                if (aux != barra.substr(4,1)){
                    throw new Error('Digito verificador '+ barra.substr(4,1) +', o correto é '+ aux +'\nO sistema não altera automaticamente o dígito correto na quinta casa!');
                }
                
                return(barra);

            } catch (e) {
                throw e
            } 
    }

    async moduleNumber11(number) {
        
            try {
                                
                number = number.replace(/[^0-9]/g,'');
               
                let soma  = 0;
                let peso  = 2;
                let base  = 9;
                let resto = 0;
                let contador = number.length - 1;
              
                for (var i=contador; i >= 0; i--) {
               
                soma = soma + ( number.substring(i,i+1) * peso);
               
                if (peso < base) {
                    peso++;
                } else {
                    peso = 2;
                }
                }
                let digito = 11 - (soma % 11);
                
                if (digito >  9) digito = 0;
               
                if (digito == 0) digito = 1;
                return digito;

            } catch (e) {
                throw e
            } 
       
    }

    async validatorsDueDate(param) {
        
            try {
                
                if (barCode.substr(5,4) == 0 ) {
                    expirationDate='O boleto pode ser pago em qualquer data';
                }
                else {
                    expirationDate = await this.paramDueDate(barCode.substr(5,4));
                }
                
                amount=(barCode.substr(9,8)*1)+','+barCode.substr(17,2);

            } catch (e) {
                throw e
            }       
    }



    async paramDueDate(param) {
        
            try {
                                
                let currentDate, t, dia, mes, ano;
                t = new Date();
                currentDate = new Date();
                currentDate.setFullYear(1997,9,7);
                t.setTime(currentDate.getTime() + (1000 * 60 * 60 * 24 * param));
                mes = (currentDate.getMonth()+1); if (mes < 10) mes = "0" + mes;
                dia = (currentDate.getDate()+1); if (dia < 10) dia = "0" + dia;
                ano = currentDate.getFullYear()
                
                return(t.toLocaleString());

            } catch (e) {
                throw e
            } 
       
    }



};
