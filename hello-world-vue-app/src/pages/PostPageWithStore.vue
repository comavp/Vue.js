<template>
    <div>
        <h1>Страница с постами, которые используют хранилище Vuex</h1>
        <my-input
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Поиск..."
            v-focus
        />
        <div class="app_buttons">
            <my-button
                @click="showDialog"
            >
                Создать пост
            </my-button>
            <my-select
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
                :options="sortOptions"
            />
        </div>        
        <my-dialog v-model:show="dialogVisible">
            <post-form
                @create="createPost"
            />
        </my-dialog>        
        <post-list 
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
            v-if="!isPostLoading"
        />
        <div v-else>Идёт загрузка...</div>
        <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import {matState, mapGetters, mapActions, mapMutations, mapState} from 'vuex'

export default {
    components: {
        PostList, PostForm
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort'
        }),
        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchPosts: 'post/fetchPosts'
        }),
        createPost(post) {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post) {
            this.posts = this.posts.filter(p => p.id !== post.id);
        },
        showDialog() {
            this.dialogVisible = true;
        }
    },
    mounted() {
        this.fetchPosts()
    },
    computed: {
        ...mapState({
            posts: state => state.post.posts,
            isPostLoading: state => state.post.isPostLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPost',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
        })
    },
    watch: {
    }
}
</script>

<style>
    .app_buttons {
        margin: 15px 0;
        display: flex;
        justify-content: space-between;
    }

    .page_wrapper {
        display: flex;
        margin-top: 15px;
    }

    .page {
        border: 1px solid black;
        padding: 10px;
    }

    .current_page {
        border: 2px solid green;
    }
</style>