<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package WordPress
 * @subpackage motaphoto
 * @since motaphoto 1.0
 */
?>

<?php
get_header();

if (have_posts()) :
    while (have_posts()) :
        the_post();
?>

<section class="single">
    <?php
    $image_url = get_the_post_thumbnail_url();
    $categories = get_the_terms($post, 'categorie'); // Remplacez 'nom_de_la_taxonomie_des_categories' par le nom de la taxonomie des catégories de votre CPT
    $type = get_field('type'); // Remplacez 'type' par le nom du champ personnalisé pour le type
    $annee = get_field('annee'); // Remplacez 'annee' par le nom du champ personnalisé pour l'année
    $reference = get_field('reference'); // Remplacez 'reference' par le nom du champ personnalisé pour la référence
    
    // Récupérer le champ "format" du CPT 
    $format_terms = get_the_terms($post, 'format');
    $format = isset($format_terms[0]) ? $format_terms[0]->name : '';
    ?>

    <div class="infos-single">
        <div class="infos-image">
            <h1><?php the_title(); ?></h1>
            <div class="reference">Référence: <?php echo $reference; ?></div>
            <div class="categories">
                Catégorie :
                <?php
                if ($categories) {
                    foreach ($categories as $category) {
                        echo '<span>' . $category->name . '</span>';
                    }
                }
                ?>
            </div>
            <div class="format">Format: <?php echo $format;?></div>
            <div class="type">Type: <?php echo $type; ?></div>
            <div class="annee">Année: <?php echo $annee; ?></div>
        </div>
        <div class="image-single">
            <img class="featured-image" src="<?php echo esc_url($image_url); ?>" data-annee="<?php echo esc_attr($annee); ?>">
        </div>
    </div>
    <div class="contact-single">
        <div class="btn-contact">
            <p>Cette photo vous intéresse ?</p>
            <button class="btn-plus" id="">Contact</button>
        </div>
        <div class="box-single">
            <div class="thumbnail-preview"></div>
            <a class="nav-link prev" href="#">Précédent</a>
            <a class="nav-link next" href="#">Suivant</a>
            
        </div>
    </div>
    <div class="more-single">
        <h3>VOUS AIMEREZ AUSSI</h3>
        <?php 
        $related_args = array(
            'post_type' => 'photo', // Remplacez 'votre_type_de_post' par le type de votre CPT
            'posts_per_page' => 2, // Nombre d'articles apparentés à afficher
            'post__not_in' => array($post->ID), // Exclure l'article actuel
            'tax_query' => array(
                array(
                    'taxonomy' => 'categorie', // Remplacez 'nom_de_la_taxonomie_des_categories' par le nom de la taxonomie des catégories
                    'field' => 'id',
                    'terms' => wp_get_post_terms($post->ID, 'categorie', array("fields" => "ids")),
                ),
            ),
        );

        $related_query = new WP_Query($related_args);

        if ($related_query->have_posts()) :
            echo '<div class="photos more-images">';
            while ($related_query->have_posts()) :
                $related_query->the_post();
                $related_image_url = get_the_post_thumbnail_url();
        ?>
        <div class="container-img">
            <img src="<?php echo esc_url($related_image_url); ?>">

            <div class="overlay">
                <a href="<?php echo esc_url(get_permalink()); ?>">
                    <i class="fas fa-eye"></i>
                </a>
                <a href="" class="open-lightbox" data-image-src="<?php echo esc_url(get_the_post_thumbnail_url()); ?>" data-reference="<?php echo esc_attr($reference); ?>" data-categories="<?php echo esc_attr(json_encode($categories)); ?>">
                    <i class="fas fa-square"></i>
                </a>
                <div class="infos">
                    <div class="left-ref"><?php echo $reference; ?></div>
                    <div class="right-cat">
                        <?php
                        
                        if ($categories) {
                            foreach ($categories as $category) {
                                echo '<span>' . $category->name . '</span>';
                            }
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
        <?php
        endwhile;
        echo '</div>'; // Fermez la div "more-images"
        endif;
        ?>
    </div>
    <button class="btn-plus btn-more-single" id="">Toutes les photos</button>
</section>

<?php
    endwhile;
endif;

get_footer();
?>
