import MeetupDetail from "@/components/meetups/MeetupDetail";
import { ObjectId, MongoClient } from "mongodb";

function MeetupDetailsPage(props) {

    return <MeetupDetail
        title={props.meetupDetail.title}
        address={props.meetupDetail.address}
        description={props.meetupDetail.description}
        image={props.meetupDetail.image}
        />
}
export async function getStaticPaths(context) {
    console.log(context);
    const client = await MongoClient.connect(
        'mongodb+srv://tala:tala@cluster0.vljehyc.mongodb.net/meetups?retryWrites=true&w=majority')    
      const dataBase = client.db()
      const meetupCollection = dataBase.collection('meetups')
      const meetup = await meetupCollection.find({}, {_id: 1}).toArray()
      client.close()
    return {
        paths: meetup.map((meetup) => ({params: {meetupDetail: meetup._id.toString()}})),
        // paths: [
        //     { params: { meetupDetail: 'm1' } },
        //     { params: { meetupDetail: 'm2' } }
        // ],
        
        fallback: true,
    }
}

export async function getStaticProps(context) {
    const meetupDetail = context.params.meetupDetail
    const client = await MongoClient.connect(
        'mongodb+srv://tala:tala@cluster0.vljehyc.mongodb.net/meetups?retryWrites=true&w=majority')
      const dataBase = client.db()
      const meetupCollection = dataBase.collection('meetups')
      const selectedMeetup = await meetupCollection.findOne({_id: new ObjectId(meetupDetail)})

    return {
        props: {
            meetupDetail: {
                image: selectedMeetup.image,
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                description: selectedMeetup.description

            }
        }

    }
}


