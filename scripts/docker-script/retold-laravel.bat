@echo off

if "%*"=="" (
    set branch=develop
) else (
    set branch=%1
)

git clone https://gitlab.com/digitbcn1/LaravelRetold.git
if errorlevel 1 (
	echo "Error: No se ha podido clonar el repositorio"
    exit /b 1
)

move .env LaravelRetold
if errorlevel 1 (
    echo "Error: No se ha podido mover el fichero .env en el repositorio LaravelRetold. Revisa que el fichero .env esté en la misma carpeta que este script"
    exit /b 1
)

cd LaravelRetold

git fetch
echo git checkout %branch%
git checkout %branch%
if errorlevel 1 (
	echo "Error: No se ha podido hacer checkout a la branca especificada [%branch%]"
	echo "Warning: Se va a usar la branca [develop] en lugar de [%branch%]"
	git checkout develop
)

docker build -t retold-api .
if errorlevel 1 (
    echo "Error: No se ha podido hacer el build de la imagen de Docker"
    exit /b 1
)

docker-compose up -d 
if errorlevel 1 (
    echo "Error: No se ha podido desplegar el container de Docker"
    exit /b 1
)
