import { View, StyleSheet, Pressable } from "react-native";
import Type from "@/components/Type";
import { router } from "expo-router";
import Octicons from "@expo/vector-icons/Octicons";
import { Colors } from "@/constants/Colors";
import Modal from "@/components/Modal";

export default function Search() {
  const showSearchModal = () => {
    router.push("/search");
  };



  return (
    <View>
      <Pressable style={styles.searchButton} onPress={showSearchModal}>
        <Octicons name="search" size={24} color="black" />
        <Type>Search artists, songs, albums, and more...</Type>
      </Pressable>

      {/* <Modal
        visible={modalVisible}
        onClose={hideSearchModal}
        title="Search"
      >
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search artists, songs, albums, and more..."
            value={search}
            onChangeText={setSearch}
            style={{ flex: 1 }}
          />
          <Button onPress={handleSearch} disabled={loading}>
            <Type style={{ color: "white" }}>Search</Type>
          </Button>
        </View>

        {error && <Type style={styles.errorText}>{error}</Type>}

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ListItem data={item} handleClick={handleSelect} />
            )}
            ListEmptyComponent={
              !loading && search.trim() ? (
                <Type style={styles.emptyText}>Sonuç bulunamadı</Type>
              ) : null
            }
          />
        )}
      </Modal> */}
    </View>
  );
}

const styles = StyleSheet.create({
  searchButton: {
    borderWidth: 1,
    borderColor: Colors.light.black,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 5,
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },
});
