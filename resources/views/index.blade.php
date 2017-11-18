<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="img/logo.png"/>

    <title>| Xavier Chevalier Portfolio |</title>
</head>
<body>
    <section id="app"></section>

    <div id="container">
        <!--  BIRDS  -->
        <div id="birds"></div>

        <!--  CLOUDS  -->
        <div id="ctn_lowCloud_1" class="layer cloudContainer" data-depth="0.15">
            <img id="lowCloud_1" class="cloud" src="img/lowCloud4.png" alt="lowcloud"/>
        </div>
        <div id="ctn_lowCloud_2" class="layer cloudContainer" data-depth="0.30">
            <img id="lowCloud_2" class="cloud" src="img/lowCloud3.png" alt="lowcloud"/>
        </div>
        <div id="ctn_lowCloud_3" class="layer cloudContainer" data-depth="0.45">
            <img id="lowCloud_3" class="cloud" src="img/lowCloud2.png" alt="lowcloud"/>
        </div>
        <div id="ctn_lowCloud_4" class="layer cloudContainer" data-depth="0.85">
            <img id="lowCloud_4" class="cloud" src="img/lowCloud5.png" alt="lowcloud"/>
        </div>
        <div id="ctn_lowCloud_5" class="layer cloudContainer" data-depth="0.65">
            <img id="lowCloud_5" class="cloud" src="img/lowCloud2.png" alt="lowcloud"/>
        </div>

        <!--  ISLANDS  -->
        <div id="first_island_container" class="layer ctn_island" data-depth="0.70">
            <div id="first_island" class="island">
                <?php include('img/first_island_calque.svg'); ?>

                <div class="info" data-title="A PROPOS"></div>
            </div>
        </div>

        <div id="second_island_container" class="layer ctn_island" data-depth="0.40">
            <div id="second_island" class="island">
                <?php include('img/second_island_calque.svg'); ?>

                <!-- LITTLE ISLAND -->
                <img alt="little_island" class="little_island" src="img/little_island.png"/>
                <div class="info" data-title="MES REALISATIONS"></div>
            </div>
        </div>

        <div id="three_island_container" class="layer ctn_island" data-depth="0.25">
            <div id="three_island" class="island">
                <?php include('img/three_island_calque.svg'); ?>

                <div class="info" data-title="CONTACT"></div>
            </div>
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js"></script>
    <script src="js/frontend.js"></script>
</body>
</html>
