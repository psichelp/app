import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'orderbyHtml'
})
export class OrderByHtmlPipe implements PipeTransform{

    // Exemplo de args: 
    // 'end' - classificado por endereço ordem Ascendente
    // '-end' - classificação DEScendente
    transform(array: Array<string>, args: string): Array<string> {

        if(!array || array === undefined || array.length === 0) return null;

        var reversed = false;
        if (args.substring(0,1) == '-') {
            reversed = true;
            args = args.substr(1);
        }

        array.sort((a: any, b: any) => {
            if (a[args] < b[args]) {
                if (reversed){
                    return 1;
                } else {
                    return -1;
                }
            } else if (a[args] > b[args]) {
                if (reversed){
                    return -1;
                } else {
                    return 1;
                }
            } else {
                return 0;
            }
        });
        var arrCopia = []; //[{'nome': '11', 'end': 'Mr. Nice' }]; //array;

        for (let i = 0; i < array.length; i++) {
            const item = array[i];
            
            // Não tem índice 'nome'
            if(typeof item['nome'] === 'undefined') {
                item['nome'] = '(sem nome)';
            }

            // Não tem índice 'end'
            if(typeof item['end'] === 'undefined') {
                item['end'] = '(sem endereço)';
            }

            var checaNome = item['nome'];
            checaNome = checaNome.trim(); //.substr(0,40);
            if (checaNome == '') {
                checaNome = '(nome em branco)';
            }
            var checaEndereco = item['end'];
            checaEndereco = checaEndereco.trim();
            if (checaEndereco == '') {
                checaEndereco = '(endereço em branco)';
            }
            arrCopia.push({'id': i, 'nome':checaNome, 'end':checaEndereco});
        }
        return arrCopia;
/*
        if (args == 'nome') {
            array.sort((a: any, b: any) => {
                if (a.nome < b.nome) {
                    return -1;
                } else if (a.nome > b.nome) {
                    return 1;
                } else {
                    return 0;
                }
            });
        } else {
            array.sort((a: any, b: any) => {
                if (a.id < b.id) {
                    return -1;
                } else if (a.id > b.id) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
        return array;
        */
    }
}

