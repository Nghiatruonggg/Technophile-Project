// Banner
$(document).ready(function(){
    $('.owl-one').owlCarousel({
        loop:true,
        margin:0,
        padding:0,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
  });

  // Product Sections
  $('.owl-two').owlCarousel({
    loop:false,
    margin:30,
    nav:true,
    dots:false,
    responsive:{
        480:{
            items:2
        },
        991:{
            items:3
        },
        1000:{
            items:4
        }
    }
})

// User Review
$('.owl-three').owlCarousel({
    loop:false,
    margin:89,
    nav:true,
    dots:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:3
        }
    }
})