ng build --prod --output-path=dist/public --aot --output-hashing="none" --source-map=false --configuration production
cd dist/public/
mkdir js
mkdir css
mv *.css css/
mv *.js js/

#rm -rf *.map

#mv assets/* .
#rm -rf assets/
mkdir -p ../resources/views/layouts/
mv index.html ../resources/views/layouts/admin.blade.php
