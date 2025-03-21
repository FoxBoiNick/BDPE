<?php

function GetBDPEConfig()
{
    return array(
        "Title" => "BDPE",
        "Styles" => array(
            "app.css"
        ),
        "Scripts" => array(
            array(
                "Name" => "tabber.js"
            ),
            array(
                "Name" => "app.js"
            ),
            array(
                "Src" => "https://cdn.jsdelivr.net/npm/frappe-charts@1.6.1/dist/frappe-charts.min.umd.js",
            ),
            array(
                "Src" => "https://cdn.jsdelivr.net/npm/frappe-charts@1.2.4/dist/frappe-charts.min.iife.js",
            ),
            array(
                "Src" => "https://cdn.jsdelivr.net/npm/fflate@0.8.0/umd/index.js",
            ),
            array(
                "Id" => "selfDestruct",
                "Name" => "loader.js"
            )
        ),
        "Version" => "0.0.0.1"
    );
}

function BDPEHeadMeta() { ?>
    <!-- Primary Meta Tags -->
    <meta name="title" content="Beatstar Data Package Explorer" />
    <meta name="description" content="BDPE is a tool to explore the contents of your Beatstar data package." />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://beatscore.eu/bdpe" />
    <meta property="og:title" content="Beatstar Data Package Explorer" />
    <meta property="og:description" content="BDPE is a tool to explore the contents of your Beatstar data package." />
    <meta property="og:image" content="https://beatscore.eu/bdpe_data/img/logo.jpg" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://beatscore.eu/bdpe" />
    <meta property="twitter:title" content="Beatstar Data Package Explorer" />
    <meta property="twitter:description" content="BDPE is a tool to explore the contents of your Beatstar data package." />
    <meta property="twitter:image" content="https://beatscore.eu/bdpe_data/img/logo.jpg" />

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- favicon -->
    <link rel="shortcut icon" href="/bdpe_data/img/favicon.ico" type="image/x-icon">
<?php } ?>