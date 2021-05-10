//calendar.js
import { firestore } from "../../firebase";
// import Schedule from "../../Schedule";

const calendar_db = firestore.collection("cal");

// Actions
const LOAD = 'calendar/LOAD';
const CREATE = 'calendar/CREATE';
const DELETE = "calendar/DELETE";
const UPDATE = "calendar/UPDATE";
// const CREATE = 'calendar/CREATE';

const initialState = {
  //   list: ["영화관 가기", "매일 책읽기", "수영 배우기"],
  list: [
    { title: "영화관 가기", date: '2021-03-22', color: "#06807d", completed: "true" },
    // { title: "매일 책읽기", date: '2021-03-22', completed: false },
    // { title: "수영 배우기", date: '2021-03-23', completed: false },
  ],
};

// Action Creators
export const loadCalendar = (Calendar) => {
  return { type: LOAD, Calendar };
}

export const createCalendar = (Calendar) => {
  return { type: CREATE, Calendar };
}

export const deleteCalendar = (Calendar) => {
  return { type: DELETE, Calendar };
};

export const updateCalendar = (Calendar) => {
  return { type: UPDATE, Calendar };
}

export const loadCalendarFB = () => {
  let calendar_data = [];
  return function (dispatch) {
    calendar_db.get().then((docs) => {
      // console.log(calendar_db)
      docs.forEach((doc) => {
        if (doc.exists) {
          calendar_data = [...calendar_data, { id: doc.id, ...doc.data() }];
        }
      })
      dispatch(loadCalendar(calendar_data));
    });
  }
}






export const updateCalendarFB = (calendar) => {
  return function (dispatch, getState) {
    // console.log(calendar.date);
    const _calendar_data = calendar;
    calendar_db.doc(calendar.id).update(_calendar_data).then(docRef => {
      dispatch(updateCalendar(calendar));
    })
      .catch(error => {
        console.log(error);
      });
  }
}

export const deleteCalendarFB = (calendar) => {
  return function (dispatch, getState) {
    const _calendar_data = calendar;
    calendar_db.doc(_calendar_data.id).delete().then(docRef => {
      dispatch(deleteCalendar(calendar));
    }).catch(error => {
      console.log(error);
    })
  }
}






export const addCalendarFB = (calendar) => {
  return function (dispatch) {
    let calendar_data = {
      title: calendar.title,
      date: calendar.date,
      time: calendar.time,
    };
    calendar_db.add(calendar_data).then(docRef => {
      calendar_data = { ...calendar_data, id: docRef.id };
      // dispatch(createCalendar(calendar_data));
    })
  }
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "calendar/LOAD":
      let calendar_data = [...action.Calendar];
      const calendar_ids = action.Calendar.map((r, idx) => {
        return r.id;
      });
      action.Calendar.filter((r, idx) => {
        if (calendar_ids.indexOf(r.id) === -1) {
          calendar_data = [...calendar_data, r];
        }
      })

      return { list: calendar_data };

    case "calendar/CREATE":
      const new_calendar_list = [...state.list, action.calendar];
      return { list: new_calendar_list };

    case "calendar/UPDATE": {
      const calendar_list = state.list.map((l, idx) => {
        if (idx === action.bucket) {
          return { ...l, completed: true };
        } else {
          return l;
        }
      })
      return { list: calendar_list };
    }

    case "calendar/DELETE":
      const calendar_list = state.list.filter((l, idx) => {
        if (idx !== action.calendar) {
          return l;
        }
      });
      return { list: calendar_list };

    default:
      return state;
  }
}