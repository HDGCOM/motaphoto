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
            // Récupération des champs personnalisées à partir de CPT UI et ACF
            $categories = get_terms('categorie');
            $formats = get_terms('format');
            $annees = get_field('annee');
        ?>
           <div class="filtres">
                <div class="categories-dropdown">

                    <div class="selected-category selection categoriesselect" id="categories-select">
                        CATÉGORIES
                        <div class="chevron"><i class="fa-solid fa-chevron-down"></i></div>
                    </div>
                    <div class="category-options">
                        <?php foreach ($categories as $category) : ?>
                            <div class="category-option" data-value="<?php echo esc_attr($category->slug); ?>">
                                <?php echo esc_html($category->name); ?>
                            </div>
                        <?php endforeach;?>
                    </div>
                </div>

                <div class="formats-dropdown">
                    <div class="selected-format selection formatsselect " id="formats-select">
                        FORMATS
                        <div class="chevron-down"><i class="fa-solid fa-chevron-down"></i></div>
                    </div>
                    <div class="format-options">
                        <?php foreach ($formats as $format) : ?>
                            <div class="format-option" data-value="<?php echo esc_attr($format->slug); ?>">
                                <?php echo esc_html($format->name); ?>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
               
                <div class="annees-dropdown" id="">
                    
                    <div class="selected-annee selection anneeselect" id="">
                        <span id="selected-annee"></span>
                        <span class="trier">TRIER PAR</span>
                        <div class="down-chevron"><i class="fa-solid fa-chevron-down"></i></div>
                    </div>
                    <div class="annee-options trier" id="annee-options">
                        <!-- Les années sont ajoutées ici dynamiquement en JavaScript -->
                    </div>
                    
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
            <div class="images-plus "></div>
            <button class="btn-plus btn-hide" id="charger">Charger plus</button>
        </section>

    </main>
<?php 
get_footer()
?>