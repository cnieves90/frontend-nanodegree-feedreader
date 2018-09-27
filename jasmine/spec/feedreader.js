/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

         // This test shows that allFeeds variable are defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        //This test show that each feed in allFeeds has a url and that it is not empty
        it("URL defined", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        //This test shows that each feed in allFeeds is named and is not empty
        it("Name defined", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


      //new test suite named "The menu"
    describe("The menu", function() {

      //This test makes the menu hidden by default
        it("the menu element hidden by default", function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        //This test makes the menu appear and hide
        it('the menu changes visibility', function() {
         // Triggers event menu
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
         // Triggers event menu
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();

        });
    });

    //new test suite named "Initial Entries"
    describe("Initial Entries", function() {

      //This test calls loadFeed() for "Initial Entries"
        beforeEach(function(done) {
            loadFeed(0, done);
        });

       // Test that shows there is a .entry element within the .feed container.
        it('has been completed', function(done) {
            expect($('.entry').children().length).toBeGreaterThan(0);
            done();
        });
    });


      //new test suite named "New Feed Selection"
    describe("New Feed Selection", function(){
        var current;
        var after;

        //Test that makes beforeEach waits for a sync to finish
        beforeEach(function(done) {
            //Loads the first feed
            loadFeed(0 ,function() {
              //Saves content feed to variable
              current = $('.feed').html();
              //Loads second feed
              loadFeed(1, function() {
                //Saves content feed to variable
                after = $('.feed').html();
                done();
              });
            });
        });

        //Test that makes sure content is different
        it('changes content' , function(done) {
            expect(current != after).toBe(true);
            done();
        });
    });
}());
