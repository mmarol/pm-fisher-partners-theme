<?php

/**
 * Template Name: News
 * Description: Page layout for the news page
 */

$pressArgs = array(
    'post_type'         => array('press'),
    'posts_per_page'    => -1,
    'orderby'           => 'date',
    'order'             => 'DESC'
);

$awardsArgs = array(
    'post_type'         => array('project'),
    'posts_per_page'    => -1,
    'meta_key' => 'awards',
    'meta_value' => array(''),
    'meta_compare' => 'NOT IN',
    'orderby' => 'title',
    'order' => 'ASC'
);


$context                = Timber::context();
$context['page']        = Timber::get_post();
$context['press']       = Timber::get_posts($pressArgs);
$context['projects']       = Timber::get_posts($awardsArgs);

$templates              = array('page-news.twig');

Timber::render($templates, $context);
