<template>
	<Page>
		<ActionBar :title="post.title">
			<NavigationButton text="Go back" icon="res://baseline_arrow_back_white_24"  @tap="$navigateBack" />
		</ActionBar>
		<ScrollView>	
			<StackLayout>
				<Image ref="image" :src="src" stretch="aspectFit"/>
				<Label :text="post.title" class="list-group-item-heading" textWrap="true"/>
				<!-- <WebView :src="'http://reddit.com' + post.permalink" /> -->
			</StackLayout>
		</ScrollView>
	</Page>
</template>

<script>
	export default{
		props: [ 'post' ],

		data(){
			return {
				src : ''
			}
		},

		mounted(){
			if(this.post.url.substr(-3) == 'jpg' || this.post.url.substr(-3) == 'png')
				this.src = this.post.url;
			else
				this.src = this.post.thumbnail;			
		},

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
</style>
