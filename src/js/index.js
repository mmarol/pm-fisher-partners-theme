import $ from "jquery";
import "stupid-table-plugin";
import "lazysizes";
import "youtube-background";
import Glide from "@glidejs/glide";

// import "./navigation";
import {
	openMenu,
	closeMenu,
	lightenMenu,
	darkenMenu,
	invertNav,
	switchLogo,
} from "./navigation";
import { setupMasonry } from "./masonry";
import { filterProjects } from "./filterProjects";
import { toggleSecondaryContent } from "./expandCard";
import "./sort";
import "./delightInteractions";

$(document).on("ready", function () {
	// initialize menu
	closeMenu();

	// initalize navigation color
	if ($("#content").hasClass("inverted")) {
		lightenMenu();
	}

	// home page navigation inversion
	let navInvertSection = $(".invert-nav:visible");
	if (navInvertSection.length > 0) {
		invertNav(navInvertSection);
	}

	// home page initialize slider
	if ($("body").hasClass("home")) {
		let iframe = $(".home-carousel__video").find("iframe");
		iframe.addClass("lazyload");

		let carousel = new Glide(".glide", {
			gap: 0,
			autoplay: 5000,
			animationDuration: 1000,
			hoverpause: true,
		});
		carousel.mount();

		switchLogo(navInvertSection);
	}

	// home page highlights masonry
	let highlightGrid = ".highlights";
	let highlightItem = ".highlight";
	let highlightSizer = ".highlight--small";
	let highlightSpacer = ".highlight__spacer";
	if (highlightItem) {
		// apply masonry
		setupMasonry(highlightGrid, highlightItem, highlightSizer, highlightSpacer);
	}

	// work page project filtering
	let projectFilters = ".project-filters";
	let projects = ".featured-project";

	if (projectFilters) {
		filterProjects(projectFilters, projects);
	}

	// news page filtering
	let newsFilters = ".news-filters";
	let newsSections = ".news__section";

	if (newsFilters) {
		filterProjects(newsFilters, newsSections);
	}

	// work page project index sorting
	if ($("#projects-table")) {
		let table = $("#projects-table").stupidtable();
	}

	// team page partners masonry
	let partnersContainer = ".partners__grid";
	let partner = ".partner";
	let partnerSizer = ".partner";
	let partnerSpacer = ".partners__spacer";
	let partnerMasonry;
	if (highlightItem) {
		// apply masonry
		partnerMasonry = setupMasonry(
			partnersContainer,
			partner,
			partnerSizer,
			partnerSpacer
		);
	}

	// team page partners toggle content
	let personPrimary = $(".partner__primary");
	let personSecondary = $(".partner__secondary");
	if (personPrimary) {
		toggleSecondaryContent(personPrimary, personSecondary, partnerMasonry);
	}
});

$(document).on("keyup", function (e) {
	if (e.key == "Escape") {
		closeMenu();
	}
});

$(window).on("load", function () {
	// Youtube Background videos initialization
	$("[data-vbg]").youtube_background({
		"fit-box": true,
		mobile: true,
		poster:
			"https://fisherpartners.flywheelstaging.com/wp-content/uploads/2022/05/santa-ynez.jpg",
		"load-background": false,
	});
});

$(window).on("scroll", function () {});
