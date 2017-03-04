import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const courses = [
  {
    id: "react-js-building-applications",
    title: "Building Applications in React ",
    watchHref: "https://www.youtube.com/watch?v=MhkGQAoc7bc&list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b",
    authorId: "steve-jobs",
    length: "5:08",
    category: "JavaScript"
  },
  {
    id: "web-dev-beginners",
    title: "web development for beginners",
    watchHref: "https://www.youtube.com/watch?v=3JluqTojuME&list=PLoYCgNOIyGAB_8_iq1cL8MVeun7cB6eNc",
    authorId: "mark-zuckerburg",
    length: "3:10",
    category: "web development"
  },
  {
    id: "Modular-Javascript",
    title: "Modular Javascript ",
    watchHref: "https://www.youtube.com/watch?v=HkFlM73G-hk&list=PLoYCgNOIyGABs-wDaaxChu82q_xQgUb4f",
    authorId: "larry-page",
    length: "2:52",
    category: "Javascript"
  },
  {
    id: "ES6-Cheatsheet",
    title: "ES6 Cheatsheet ",
    watchHref: "https://www.youtube.com/watch?v=AfWYO8t7ed4&list=PLoYCgNOIyGACDQLaThEEKBAlgs4OIUGif",
    authorId: "steve-jobs",
    length: "2:30",
    category: "Javascript"
  },
  {
    id: "angularjs",
    title: "Angularjs",
    watchHref: "https://www.youtube.com/watch?v=QETUuZ27N0w&list=PLoYCgNOIyGACEvLxZSD0YSrxKwfgnnkD9",
    authorId: "larry-page",
    length: "5:10",
    category: "angularjs"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (course) => {
  return replaceAll(course.title, ' ', '-');
};

class CourseApi {
  static getAllCourses() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], courses));
      }, delay);
    });
  }

  static saveCourse(course) {
    course = Object.assign({}, course); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minCourseTitleLength = 1;
        if (course.title.length < minCourseTitleLength) {
          reject(`Title must be at least ${minCourseTitleLength} characters.`);
        }

        if (course.id) {
          const existingCourseIndex = courses.findIndex(a => a.id == course.id);
          courses.splice(existingCourseIndex, 1, course);
        } else {
          //Just simulating creation here.
          //The server would generate ids and watchHref's for new courses in a real app.
          //Cloning so copy returned is passed by value rather than by reference.
          course.id = generateId(course);
          course.watchHref = `http://www.pluralsight.com/courses/${course.id}`;
          courses.push(course);
        }

        resolve(course);
      }, delay);
    });
  }

  static deleteCourse(courseId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfCourseToDelete = courses.findIndex(course => {
          course.id == courseId;
        });
        courses.splice(indexOfCourseToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default CourseApi;