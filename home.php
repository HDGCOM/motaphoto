<?php 
get_header()
?>
    <main>
        <section class="hero">
             <div class="hero-title">
                <h1>PHOTOGRAPHE EVENT</h1>
            </div>
            <div class="hero-image">
                <?php
                $image_id= 32;
                $image_url= wp_get_attachment_url($image_id, 'full');
                echo '<img src="'.$image_url.'" alt="Fete de mariage"/>';
                ?>
            </div>
        </section>
        <section class="galerie">
        <?php
            // Récupération des catégories personnalisées à partir de CPT UI
            $categories = get_terms('categorie');

            // Récupération des formats personnalisés à partir de CPT UI
            $formats = get_terms('format');
            
        ?>

            <!-- Affichez les filtres sur la page -->
            
            <div class="filtres">
                <div class="catfor">
                    <div class="catégories">
                        <select class="selection" id="categories-select">
                            <option value="">CATÉGORIES</option>
                            <?php foreach ($categories as $category) : ?>
                                <option value="<?php echo esc_attr($category->slug); ?>"><?php echo esc_html($category->name); ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                    <div class="formats">
                        <select class="selection" id="formats-select">
                            <option value="">FORMATS</option>
                            <?php foreach ($formats as $format) : ?>
                                <option value="<?php echo esc_attr($format->slug); ?>"><?php echo esc_html($format->name); ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div> 
                </div>
                <div class="trier">
                   <select class="selection" id="annee-select">
                        <option value="">TRIER PAR</option>
                    </select>
                </div>        
            </div>
            <div class="photos filter-photos">
                <?php
                    $args = array(
                        'post_type' => 'photo', // Remplacez 'photo' par le slug de votre type de publication personnalisé
                        'posts_per_page' => 8, // Récupère les 8 premières images
                    );

                    $photo_query = new WP_Query($args);

                    if ($photo_query->have_posts()) :
                        while ($photo_query->have_posts()) : $photo_query->the_post();
                            $image_id = get_post_thumbnail_id();
                            $reference = get_field('reference', $image_id);
                            $categories = get_the_terms(get_the_ID(), 'categorie');
                            $image_url = get_the_post_thumbnail_url(); // URL de l'image
                            $image_annee = get_field('annee', $image_id); // Récupérer l'année personnalisée ACF de l'image
                            
                            // Obtenez l'URL de la miniature
                            $thumbnail_data = wp_get_attachment_image_src($image_id, 'thumbnail'); // Remplacez 'thumbnail' par la taille de miniature que vous souhaitez
                            $thumbnail_url = $thumbnail_data[0];
                            ?>

                            <div class="container-img">
                                <img class="featured-image" src="<?php echo $image_url; ?>" data-thumbnail-src="<?php echo $thumbnail_url; ?>" data-annee="<?php echo esc_attr($image_annee); ?>">
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
                        wp_reset_postdata();
                    endif;

                    
                    
                ?>


            </div>
            <div class="images-plus photos"></div>
            
            <button class="btn-plus" id="charger">Charger plus</button>

             <!-- Structure de la lightbox 
            <div id="lightbox" class="lightbox">
                <span class="close-button" id="close-button">&times;</span>
                <div class="element-lightbox">
                    <button class="lightbox__prev" id="prev-button">Précédent</button>
                    <div class="lightbox-content">
                        <img id="lightbox-image" class="lightbox-image" src="" alt="Image">
                        <div class="info-ref-cat">
                            <div class="ref" id="lightbox-reference"></div>
                            <div class="cat" id="lightbox-categories"></div>
                        </div>
                    </div>
                    <button class="lightbox__next" id="next-button">Suivant</button>
                    
                </div>
                
            </div>-->
        </section>

    </main>
<?php 
get_footer()
?>