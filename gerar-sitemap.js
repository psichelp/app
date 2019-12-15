#!/usr/bin/env node

var fs = require('fs');


function generate_xml_sitemap(urls) {
    // this is the source of the URLs on your site, in this case we use a simple array, actually it could come from the database
    // the root of your website - the protocol and the domain name with a trailing slash
    var root_path = 'https://psicohelp.org/webapp/#/';
    // XML sitemap generation starts here
    var priority = 0.5;
    var freq = 'monthly';
    var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    for (var i in urls) {
        xml += '<url>';
        xml += '<loc>' + root_path + urls[i] + '</loc>';
        xml += '<changefreq>' + freq + '</changefreq>';
        xml += '<priority>' + priority + '</priority>';
        xml += '</url>';
        i++;
    }
    xml += '</urlset>';
    return xml;
}

function completar_estabelecimento(estabelecimento) {
    complemento = "detalhes;local=";
    return complemento + encodeURI(estabelecimento.id);
}

var estabelecimentos = fs.readFileSync('./src/assets/data/estabelecimentos.json').toString();

estabelecimentos = JSON.parse(estabelecimentos);


urls_estabelecimentos = estabelecimentos.map(estabelecimento => completar_estabelecimento(estabelecimento));

let urls = ['inicio',
    'buscar',
    'cadastrar',
    'listar;servico=Terapia%20individual',
    'listar;servico=Crian%C3%A7as%20e%20adolescentes',
    'listar;servico=Medicamentos%20grat%C3%BAitos',
    'listar;servico=Emerg%C3%AAncia%20Psiqui%C3%A1trica',
    'listar;servico=Online',
    'listar;servico=CAPS',
    'listar;servico=Terapia%20de%20Grupo',
    'listar;servico=Terapia%20Familiar',
    'listar;servico=Terapia%20Conjugal',
    'listar;servico=Orienta%C3%A7%C3%A3o%20Profissional',
    'listar;servico=LGBT',
    'listar;servico=Drogas',
    'listar;servico=Planos%20de%20sa%C3%BAde%20-%20Psicologos',
    'listar;servico=Musicoterapia'];


let site_map = generate_xml_sitemap([...urls, ...urls_estabelecimentos]);

console.log(site_map);
//
    // var concat_array = [...array_first, ...array_second];