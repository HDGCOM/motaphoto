<?php
// Assurez-vous d'inclure WordPress si vous n'utilisez pas un modèle de page WordPress.
//require_once("wp-load.php");

// Récupérez les attributs ACF pour les images.
//$categories = get_field('categorie', $image_id);
//$formats = get_field('format', $image_id);
$annee = get_field('annee', $image_id);

// Retournez les attributs sous forme de tableau JSON.
$response = array(
    /*'categories' => $categories,
    'formats' => $formats,*/
    'annee' => $annee
);

// Pour récupérer les termes de catégories CPT UI.
$categories = get_terms(array(
    'taxonomy' => 'categories',
    'hide_empty' => false // Affiche les termes même s'ils sont vides.
));

// Pour récupérer les termes de formats CPT UI.
$formats = get_terms(array(
    'taxonomy' => 'formats',
    'hide_empty' => false // Affiche les termes même s'ils sont vides.
));


header('Content-Type: application/json');
echo json_encode($response);
?>
