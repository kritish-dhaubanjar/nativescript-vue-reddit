<template>
	<Frame>
		<Page actionBarHidden="true">
			<RadSideDrawer ref="drawer">
			<StackLayout ~drawerContent backgroundColor="#ffffff">
				<Label class="drawer-header" text="Reddits"/>
				<ListView for="r in reddits" @itemTap="getNewReddit">
				  <v-template>
					<!-- <Label class="drawer-item" :text="'/r/' + r" @tap="getNewReddit(r)"/> -->
					<Label class="drawer-item" :text="'/r/' + r"/>
				  </v-template>
				</ListView>
			</StackLayout>

			<GridLayout ~mainContent columns="*" rows="*">
				<Frame>
					<Page>
						<ActionBar :title="'/r/' + reddit">
							<ActionItem @tap="addReddit"
							ios.systemIcon="2" ios.position="right"
							icon="res://sharp_add_white_24" />

							<ActionItem @tap="delReddit"
							ios.systemIcon="2" ios.position="right"
							icon="res://sharp_delete_white_24" />

							<NavigationButton text="Menu" icon="res://baseline_menu_white_24" @tap="$refs.drawer.nativeView.showDrawer()" />       
							      
						</ActionBar>  
						<ScrollView>
							<ListView for="post in posts" @itemTap="onItemTap">
							  <v-template>
								<GridLayout rows="*" columns="90,*">
									<Image row="0" col="0" :src="post.data.thumbnail" stretch="none" />
									<Label row="0" col="1" :text="post.data.title" class="list-group-item-heading" textWrap="true" />
								</GridLayout>
							  </v-template>
							</ListView>	
						</ScrollView>
					</Page>
				</Frame>
			</GridLayout>
			</RadSideDrawer>
		</Page>
	</Frame>
</template>

<script >
  import Post from './Post.vue'
  
  export default {
	data() {
	  return {
		reddit : '',
		posts: [],
	  }
	},

	computed:{
		reddits(){
			return this.$store.getters.getReddits;
		}
	},

	mounted(){
		// fetch('https://www.reddit.com/r/memes.json')
		this.reddit = (this.$store.getters.getReddits)[0];
		fetch('https://www.reddit.com/r/' + (this.$store.getters.getReddits)[0] +'.json')
		.then(res=>{
			return res.json();
		}).then(json=>{
			this.posts = json.data.children;
		})
	},

	methods:{
		onItemTap(event){
			this.$navigateTo(Post, {
				props:{
					post: event.item.data
				}
			});
		},

		addReddit(){
		   prompt({
			  title: "Add a new Reddit",
			  message: "eg: funny, aww, memes, pics",
			  okButtonText: "Add",
			  cancelButtonText: "Cancel",
			}).then(result => {
				if(`${result.result}` && `${result.text}`.length > 0){
					this.$store.commit('addReddit', `${result.text}`)
				}
			});
		},

		delReddit(){
			confirm({
			  title: "Delete " + this.reddit + " ?",
			  message: "Are you sure?",
			  okButtonText: "Delete",
			  cancelButtonText: "Cancel"
			}).then(result => {
			  if(result) this.$store.commit('delReddit', this.reddit)
			});
		},

		getNewReddit(event){
			console.log(event.item);
			this.reddit = event.item;
			this.$refs.drawer.nativeView.closeDrawer();
			fetch('https://www.reddit.com/r/' + this.reddit + '.json')
			.then(res=>{
				return res.json();
			}).then(json=>{
				this.posts = json.data.children;
			})
		},
	}

  };
</script>

<style scoped>
	ActionBar {
		background-color: #3F51B5;
		color: #ffffff;
	}

	.list-group-item-heading{
		font-size: 16;
		padding: 16 16;
		color: #333333;
	}

	.drawer-header {
		padding: 50 16 16 16;
		background-color: #3F51B5;
		color: #ffffff;
		font-size: 24;
	}

	.drawer-item {
		padding: 16 16;
		color: #333333;
		font-size: 16;
	}
</style>
