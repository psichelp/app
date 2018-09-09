#!/bin/bash

APP="PsicHelp"

 function acp {
    git add -A .
    git commit -m "$*"
    git push
}


ng build --prod

rm -rf docs
cp dist/PsicHelp docs -r
cd docs
php -S 0.0.0.0:8015

echo Teste primeiro localmente, funcionou?
read answer
if [ "$answer" != "${answer#[SsYy]}" ] ;then
    echo OK, continuando
else
    echo Saindo!
    exit
fi
cd ..

acp Publicando o webApp no raciocínio computacional 

cd ../site
git pull
rm -rf ios
 
cp ../app/dist/PsicHelp ios -r

acp Publicando o webApp no psicweb/ios 

echo teste agora em https://bit.ly/psichelpweb funcionou?
read answer
if [ "$answer" != "${answer#[SsYy]}" ] ;then
    echo OK, Parabéns!
else
    echo Eita pau!!!!!!!!!!!!!!!!!!!
    exit
fi


