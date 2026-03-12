import { useState } from "react";
import { FlatList, Image, Text, TextInput, View } from "react-native";

export default function App() {

  const photos = [
    { id:"1", city:"Paris", date:"2026-03-12", distance:5, uri:"https://picsum.photos/200"},
    { id:"2", city:"Lyon", date:"2026-03-10", distance:30, uri:"https://picsum.photos/201"},
    { id:"3", city:"Marseille", date:"2026-03-08", distance:15, uri:"https://picsum.photos/202"},
    { id:"4", city:"Nice", date:"2026-03-07", distance:60, uri:"https://picsum.photos/203"},
    { id:"5", city:"Bordeaux", date:"2026-03-05", distance:80, uri:"https://picsum.photos/204"},
  ];

  const [search,setSearch] = useState("");
  const [dateMin,setDateMin] = useState("");
  const [dateMax,setDateMax] = useState("");
  const [maxDistance,setMaxDistance] = useState("");

  function normalizeDateMax(input){

    if(!input) return null;

    if(input.length === 4){
      return new Date(`${input}-12-31`);
    }

    if(input.length === 7){
      return new Date(`${input}-31`);
    }

    return new Date(input);
  }

  const maxDate = normalizeDateMax(dateMax);

  const sortedPhotos = [...photos].sort(
    (a,b)=> new Date(b.date) - new Date(a.date)
  );

  const filteredPhotos = sortedPhotos.filter(photo => {

    const keywordMatch =
      photo.city.toLowerCase().includes(search.toLowerCase());

    const dateMinMatch =
      dateMin === "" || new Date(photo.date) >= new Date(dateMin);

    const dateMaxMatch =
      !maxDate || new Date(photo.date) <= maxDate;

    const distanceLimit =
      maxDistance === "" ? Infinity : Number(maxDistance);

    const distanceMatch =
      photo.distance <= distanceLimit;

    return keywordMatch && dateMinMatch && dateMaxMatch && distanceMatch;
  });

  return (
    <View style={{padding:20}}>

      <TextInput
        placeholder="🔍 search city"
        value={search}
        onChangeText={setSearch}
        style={{borderWidth:1,padding:8,marginBottom:10}}
      />

      <TextInput
        placeholder="date min (YYYY-MM-DD)"
        value={dateMin}
        onChangeText={setDateMin}
        style={{borderWidth:1,padding:8,marginBottom:10}}
      />

      <TextInput
        placeholder="date max (YYYY-MM-DD)"
        value={dateMax}
        onChangeText={setDateMax}
        style={{borderWidth:1,padding:8,marginBottom:10}}
      />

      <TextInput
        placeholder="distance max (km)"
        value={maxDistance}
        onChangeText={setMaxDistance}
        keyboardType="numeric"
        style={{borderWidth:1,padding:8,marginBottom:10}}
      />

      <FlatList
        data={filteredPhotos}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          <View style={{flexDirection:"row",padding:10,borderBottomWidth:1}}>
            <Image
              source={{uri:item.uri}}
              style={{width:70,height:70,marginRight:10}}
            />

            <View>
              <Text>📍 {item.city}</Text>
              <Text>📅 {item.date}</Text>
              <Text>📏 {item.distance} km</Text>
            </View>
          </View>
        )}
      />

    </View>
  );
}

/*
photosService.js

export async function getPhotos() {

  const photos = [
    { id:"1", city:"Paris", date:"2026-03-12", distance:5, uri:"https://picsum.photos/200"},
    { id:"2", city:"Lyon", date:"2026-03-10", distance:30, uri:"https://picsum.photos/201"},
    { id:"3", city:"Marseille", date:"2026-03-08", distance:15, uri:"https://picsum.photos/202"},
    { id:"4", city:"Nice", date:"2026-03-07", distance:60, uri:"https://picsum.photos/203"},
    { id:"5", city:"Bordeaux", date:"2026-03-05", distance:80, uri:"https://picsum.photos/204"},
  ];

  // simulation appel API
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(photos);
    },300);
  });

}

*/

/* 

APP
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TextInput, View } from "react-native";
import { getPhotos } from "./services/photosService";

export default function App() {

  const [photos,setPhotos] = useState([]);

  const [search,setSearch] = useState("");
  const [dateMin,setDateMin] = useState("");
  const [dateMax,setDateMax] = useState("");
  const [maxDistance,setMaxDistance] = useState("");

  useEffect(()=>{
    loadPhotos();
  },[]);

  async function loadPhotos(){
    const data = await getPhotos();
    setPhotos(data);
  }

  function normalizeDateMax(input){

    if(!input) return null;

    if(input.length === 4){
      return new Date(`${input}-12-31`);
    }

    if(input.length === 7){
      return new Date(`${input}-31`);
    }

    return new Date(input);
  }

  const maxDate = normalizeDateMax(dateMax);

  const sortedPhotos = [...photos].sort(
    (a,b)=> new Date(b.date) - new Date(a.date)
  );

  const filteredPhotos = sortedPhotos.filter(photo => {

    const keywordMatch =
      photo.city.toLowerCase().includes(search.toLowerCase());

    const dateMinMatch =
      dateMin === "" || new Date(photo.date) >= new Date(dateMin);

    const dateMaxMatch =
      !maxDate || new Date(photo.date) <= maxDate;

    const distanceLimit =
      maxDistance === "" ? Infinity : Number(maxDistance);

    const distanceMatch =
      photo.distance <= distanceLimit;

    return keywordMatch && dateMinMatch && dateMaxMatch && distanceMatch;
  });

  return (
    <View style={{padding:20}}>

      <TextInput
        placeholder="🔍 search city"
        value={search}
        onChangeText={setSearch}
        style={{borderWidth:1,padding:8,marginBottom:10}}
      />

      <TextInput
        placeholder="date min (YYYY-MM-DD)"
        value={dateMin}
        onChangeText={setDateMin}
        style={{borderWidth:1,padding:8,marginBottom:10}}
      />

      <TextInput
        placeholder="date max (YYYY-MM-DD)"
        value={dateMax}
        onChangeText={setDateMax}
        style={{borderWidth:1,padding:8,marginBottom:10}}
      />

      <TextInput
        placeholder="distance max (km)"
        value={maxDistance}
        onChangeText={setMaxDistance}
        keyboardType="numeric"
        style={{borderWidth:1,padding:8,marginBottom:10}}
      />

      <FlatList
        data={filteredPhotos}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=>(
          <View style={{flexDirection:"row",padding:10,borderBottomWidth:1}}>
            <Image
              source={{uri:item.uri}}
              style={{width:70,height:70,marginRight:10}}
            />

            <View>
              <Text>📍 {item.city}</Text>
              <Text>📅 {item.date}</Text>
              <Text>📏 {item.distance} km</Text>
            </View>
          </View>
        )}
      />

    </View>
  );
} */