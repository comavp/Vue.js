<template>
    <div>
        <h1>Страница с постами через Composition Api</h1>
        <my-input
            v-model="searchQuery"
            placeholder="Поиск..."
            v-focus
        />
        <div class="app_buttons">
            <my-button
            >
                Создать пост
            </my-button>
            <my-select
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>        
        <my-dialog v-model:show="dialogVisible">
            <post-form
               
            />
        </my-dialog>        
        <post-list 
            :posts="sortedAndSearchedPosts"
            
            v-if="!isPostLoading"
        />
        <div v-else>Идёт загрузка...</div>
    </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import MyInput from "@/components/ui/MyInput.vue";
import MySelect from "@/components/ui/MySelect.vue";
import MyButton from "@/components/ui/MyButton.vue";
import {usePosts} from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts";

export default {
    components: {
        MyInput,
        MySelect,
        MyButton,
        PostList, 
        PostForm
    },
    data() {
        return {
            dialogVisible: false,
            sortOptions: [
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'}
            ]
        }
    },
    setup(props) {
        const {posts, totalPages, isPostsLoading} = usePosts(10);
        const {selectedSort, sortedPosts} = useSortedPosts(posts);
        const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts);

        return {
            posts,
            totalPages,
            isPostsLoading,
            sortedPosts,
            selectedSort,
            searchQuery,
            searchQuery,
            sortedAndSearchedPosts
        }
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